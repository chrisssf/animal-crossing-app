// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAv5WeFLbe5q3_M9Pwdc7AbUfjtYOZrZ-w",
    authDomain: "animalcrossing-c4729.firebaseapp.com",
    databaseURL: "https://animalcrossing-c4729.firebaseio.com",
    projectId: "animalcrossing-c4729",
    storageBucket: "animalcrossing-c4729.appspot.com",
    messagingSenderId: "501589667521",
    appId: "1:501589667521:web:85966a826dd56969be6e40",
    measurementId: "G-SW576K0P6J"
  };


firebase.initializeApp(firebaseConfig);
console.log("FIREBASE CONFIG");
const db = firebase.firestore();
export default db;