import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBv6z07UPyXSGaz01f3zH8oP_qtt22sYAw",
  authDomain: "test-eaa03.firebaseapp.com",
  projectId: "test-eaa03",
  storageBucket: "test-eaa03.appspot.com",
  messagingSenderId: "663044472890",
  appId: "1:663044472890:web:6c0d4d651a7e4e20b27503"
};


// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore service

const projectFirestore = firebase.firestore();
// const projectAuth = firebase.auth();

// const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore };
