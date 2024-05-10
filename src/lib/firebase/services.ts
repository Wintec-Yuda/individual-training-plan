import { collection, getDocs, getFirestore, doc, getDoc, addDoc, updateDoc, query, where } from "firebase/firestore";
import app from "./init";
import { log } from "util";

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

export async function manageCoursesEmployee(nik: string, codes: string[], action: "list" | "register") {
  try {
    const courseRef = collection(firestore, "courses");
    const updatePromises: any = [];

    for (const code of codes) {
      const coursesQuery = query(courseRef, where("code", "==", code));
      const coursesSnapshot = await getDocs(coursesQuery);

      coursesSnapshot.forEach((courseDoc) => {
        const courseData = courseDoc.data();
        const updatedEmployees = { ...courseData.employees };

        if (action === "register") {
          updatedEmployees[nik].isSubmit = true;
        } else if (action === "list") {
          updatedEmployees[nik] = { isSubmit: false };
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
