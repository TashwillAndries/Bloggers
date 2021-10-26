import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB26BQ7PDkEvhxQKuiH640Ty9b0KmQQndo",
  authDomain: "blog-project-510ba.firebaseapp.com",
  projectId: "blog-project-510ba",
  storageBucket: "blog-project-510ba.appspot.com",
  messagingSenderId: "195892222378",
  appId: "1:195892222378:web:c9dd829ee61e4c36cdf3d3",
};

firebase.initializeApp(firebaseConfig);

const projectFire = firebase.firestore();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFire, projectAuth, timestamp };
