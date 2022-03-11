//import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(firestore, "users", `${userAuth.uid}`);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {

        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            //await userRef.set({
            setDoc(
                userRef, {
                displayName,
                email, 
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log("error creating user", error.message);
        }
    }

    return userRef;
    //console.log(firestore.document('users/asdqwfassdasd'))
};

initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore();

//export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

//export default firebase;