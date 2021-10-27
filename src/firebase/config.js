import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// import "firebase/auth";

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyBv6z07UPyXSGaz01f3zH8oP_qtt22sYAw",
  authDomain: "test-eaa03.firebaseapp.com",
  projectId: "test-eaa03",
  storageBucket: "test-eaa03.appspot.com",
  messagingSenderId: "663044472890",
  appId: "1:663044472890:web:6c0d4d651a7e4e20b27503"
=======
  apiKey: "AIzaSyCJW_1-koTvhWs93Ct6dhQ5Z7oroFopwYo",
  authDomain: "blog-site-5288a.firebaseapp.com",
  projectId: "blog-site-5288a",
  storageBucket: "blog-site-5288a.appspot.com",
  messagingSenderId: "10222170570",
  appId: "1:10222170570:web:a54a2fa0d63311a0c29f33",
>>>>>>> fc7bbbf814fa8ad8e51cadf74e30faf495d458ab
};


// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore service

const projectFirestore = firebase.firestore();
// const projectAuth = firebase.auth();

// const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore };
