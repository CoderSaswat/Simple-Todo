// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB9692h_0_2vauZMKKkS76u0SuGD7yysVk",
//   authDomain: "simple-todo-with-user.firebaseapp.com",
//   projectId: "simple-todo-with-user",
//   storageBucket: "simple-todo-with-user.appspot.com",
//   messagingSenderId: "914185249689",
//   appId: "1:914185249689:web:c5cb11b7b9adf665252908",
//   measurementId: "G-W3PYR4KY82"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firebaseAuth = getAuth(app);
// export default firebaseAuth;

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyB9692h_0_2vauZMKKkS76u0SuGD7yysVk",
    authDomain: "simple-todo-with-user.firebaseapp.com",
    projectId: "simple-todo-with-user",
    storageBucket: "simple-todo-with-user.appspot.com",
    messagingSenderId: "914185249689",
    appId: "1:914185249689:web:c5cb11b7b9adf665252908",
    measurementId: "G-W3PYR4KY82"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;
  
