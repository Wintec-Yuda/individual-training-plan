import { collection, getDocs, getFirestore, doc, getDoc, addDoc } from "firebase/firestore";
import app from "./init";

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
