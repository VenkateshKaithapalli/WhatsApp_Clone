import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmqk28UporFMtlc6YC8mVMJ-2Sqt5U42I",
  authDomain: "whatsapp-2-e428d.firebaseapp.com",
  projectId: "whatsapp-2-e428d",
  storageBucket: "whatsapp-2-e428d.appspot.com",
  messagingSenderId: "1014306895960",
  appId: "1:1014306895960:web:cdea54b70e91c63320f22d",
  measurementId: "G-2X3KXCL5BH",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
