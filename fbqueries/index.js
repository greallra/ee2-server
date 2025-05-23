import { collection, getDocs, getDoc, doc, setDoc } from "@firebase/firestore";
import { FIREBASE_DB } from "../firebaseconfig.js";

export function esGetCollection(collectionName) {
  return new Promise(async (resolve, reject) => {
    try {
      const colRef = collection(FIREBASE_DB, collectionName);
      const snapshots = await getDocs(colRef);
      let data = [];
      snapshots.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      resolve({
        error: false,
        data,
      });
    } catch (error) {
      reject({
        error: true,
        message: error.message,
      });
    }
  });
}

export async function esGetDoc(collectionName, docId) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(FIREBASE_DB, collectionName, docId);
      const docSnap = await getDoc(docRef);
      resolve({
        error: false,
        docSnap,
      });
    } catch (error) {
      reject({
        error: true,
        message: error.message,
      });
    }
  });
}
//events

export async function esAddEvent(FIREBASE_DB, docId, collectionName, data) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await setDoc(
        doc(FIREBASE_DB, collectionName, docId),
        data
      );
      resolve({
        error: false,
        docRef,
      });
    } catch (error) {
      reject({
        error: true,
        message: error.message,
      });
    }
  });
}
