// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEgRKTu-a7vxXaxahot0nEWBv00zkIDCQ",
  authDomain: "leah-a6a65.firebaseapp.com",
  projectId: "leah-a6a65",
  storageBucket: "leah-a6a65.appspot.com",
  messagingSenderId: "242584870318",
  appId: "1:242584870318:web:2b10e5dab095885246bc3f",
  measurementId: "G-20RGHGBQSJ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
//export const imgStorage = firebase.storage;
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const storage = getStorage(app);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
