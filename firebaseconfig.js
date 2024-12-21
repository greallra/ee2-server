const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "exchanges-b4fe1",
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
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
