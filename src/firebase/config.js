import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCJW_1-koTvhWs93Ct6dhQ5Z7oroFopwYo",
  authDomain: "blog-site-5288a.firebaseapp.com",
  projectId: "blog-site-5288a",
  storageBucket: "blog-site-5288a.appspot.com",
  messagingSenderId: "10222170570",
  appId: "1:10222170570:web:a54a2fa0d63311a0c29f33",
};


// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore service

const projectFire = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFire, projectAuth, timestamp, projectStorage };
