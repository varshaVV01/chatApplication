// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXiyus1wExY_OvGaGJpRIAJiL02XwBICI",
    authDomain: "chatapplication-d5fee.firebaseapp.com",
    projectId: "chatapplication-d5fee",
    storageBucket: "chatapplication-d5fee.appspot.com",
    messagingSenderId: "490019832905",
    appId: "1:490019832905:web:d40c45ebeadf5512c92b98"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()