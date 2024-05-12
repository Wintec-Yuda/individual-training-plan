import { collection, getDocs, getFirestore, doc, getDoc, addDoc, updateDoc, query, where } from "firebase/firestore";
import app from "./init";
import { formatDate } from "@/utils";

const firestore = getFirestore(app);

export async function getData(collectionName: string) {
  try {
    const snapshot = await getDocs(collection(firestore, collectionName));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addData(collectionName: string, data: any) {
  try {
    await addDoc(collection(firestore, collectionName), data);
    return true;
  } catch (error) {
    return false;
  }
}

export async function getDataById(collectionName: string, id: string) {
  try {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getDataByField(collectionName: string, fieldName: string, value: string) {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    const data = querySnapshot.docs
      .filter((doc) => doc.data()[fieldName] === value)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function manageCoursesEmployee(data: any) {
  try {
    const courseRef = collection(firestore, "courses");
    const updatePromises: any = [];

    for (let i = 0; i < data.codes.length; i++) {
      const coursesQuery = query(courseRef, where("code", "==", data.codes[i]));
      const coursesSnapshot = await getDocs(coursesQuery);

      coursesSnapshot.forEach((courseDoc) => {
        const courseData = courseDoc.data();
        const updatedEmployees = courseData.employees || [];

        if (data.action === "submit") {
          updatedEmployees.map((employee: any) => {
            if (employee.nik === data.nik) employee.isSubmit = true;
          });
        } else if (data.action === "register") {
          updatedEmployees.push({
            nik: data.nik,
            name: data.name,
            isSubmit: false,
            golongan: data.golongan,
            empccname: data.empccname,
            approve: data.golongan === "5" ? 2 : 1,
          });
        } else if (data.action === "approve") {
          updatedEmployees.map((employee: any) => {
            const approval = {
              nik: data.nik,
              name: data.name,
              approve: employee.approve,
              date: formatDate(new Date()),
            };
            if (employee.nik === data.nikApproves[i]) {
              if (["1", "2", "3"].includes(employee.golongan) && employee.approve === 2) {
                employee.approve += 2;
              } else {
                employee.approve += 1;
              }
              if (employee.approvals) {
                employee.approvals.push(approval);
              } else {
                employee.approvals = [approval];
              }
            }
          });
        } else if (data.action === "reject") {
          updatedEmployees.map((employee: any) => {
            if (employee.nik === data.nikApproves[i]) {
              employee.isSubmit = false;
              employee.message = data.message;
              const reject = {
                nik: data.nik,
                name: data.name,
                message: data.message,
                date: formatDate(new Date()),
              };
              if (employee.rejects) {
                employee.push(reject);
              } else {
                employee.rejects = [reject];
              }
            }
          });
        }

        const courseDocRef = doc(firestore, "courses", courseDoc.id);
        const updatePromise = updateDoc(courseDocRef, { employees: updatedEmployees });
        updatePromises.push(updatePromise);
      });
    }

    await Promise.all(updatePromises);
    return true;
  } catch (error) {
    throw error;
  }
}
