// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMurFOcXdmrScVXEboc9Rezmduo-Vjn70",
  authDomain: "react-reels-app.firebaseapp.com",
  projectId: "react-reels-app",
  storageBucket: "react-reels-app.appspot.com",
  messagingSenderId: "951189809561",
  appId: "1:951189809561:web:bd0fbd92056c7fce300b08",
  measurementId: "G-DTT3K0RKGM"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage=getStorage(app); 
export const db=getFirestore(app);
// const analytics = getAnalytics(app);