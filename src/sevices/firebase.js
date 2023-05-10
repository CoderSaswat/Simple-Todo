
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
  
