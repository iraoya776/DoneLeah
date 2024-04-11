// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { firebase_Config } from "./APIkeys.Key";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebase_Config.apiKey,
  authDomain: firebase_Config.authDomain,
  projectId: firebase_Config.projectId,
  storageBucket: firebase_Config.storageBucket,
  messagingSenderId: firebase_Config.messagingSenderId,
  appId: firebase_Config.appId,
  measurementId: firebase_Config.measurementId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
//export const imgStorage = firebase.storage;
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
//const analytics = getAnalytics(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const storage = getStorage(app);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseDB = getDatabase(app);
