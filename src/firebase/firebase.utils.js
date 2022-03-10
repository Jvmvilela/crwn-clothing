//import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";

//import 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const config = {
    apiKey: "AIzaSyCP34jn1qdKB8dDbOr97HkZWQEgv0DwZ0Y",
    authDomain: "crwn-db-8c657.firebaseapp.com",
    projectId: "crwn-db-8c657",
    storageBucket: "crwn-db-8c657.appspot.com",
    messagingSenderId: "880643648621",
    appId: "1:880643648621:web:e114e2778c5adfeb7da364",
    measurementId: "G-260ESKTF5Y"
};

initializeApp(config);

export const auth = getAuth();
//export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

//export default firebase;