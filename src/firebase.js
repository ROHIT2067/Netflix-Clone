import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  collection,
  getFirestore,
  addDoc
} from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyCoIAsgYuKwgUJskkoDGsurfjTHHD3Eilg",
  authDomain: "netflix-clone-cbfa1.firebaseapp.com",
  projectId: "netflix-clone-cbfa1",
  storageBucket: "netflix-clone-cbfa1.firebasestorage.app",
  messagingSenderId: "815266182489",
  appId: "1:815266182489:web:cc5b62fd6fc31370018848"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)

const signup=async (name,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login=async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
       toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout= ()=>{
    signOut(auth)
}


export { auth, db, login, signup, logout };