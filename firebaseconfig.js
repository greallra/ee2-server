const firebaseConfig = {
  apiKey: "AIzaSyAkTPwKPtm-6RtWu_PR3LHAuuSx2ISK8bQ",
  authDomain: "exchanges-b4fe1.firebaseapp.com",
  projectId: "exchanges-b4fe1",
  storageBucket: "exchanges-b4fe1.appspot.com",
  messagingSenderId: "306322295860",
  appId: "1:306322295860:web:ab052ff6bd340ce14a4e61",
};

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
// import { esGetCollection } from "exchanges-shared";

const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// export {
//   FIREBASE_APP,
//   FIREBASE_DB,

// };
