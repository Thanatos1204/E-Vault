import { GoogleAuthProvider } from "firebase/auth";
import { auth,db } from './config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc,setDoc,doc, collection } from "firebase/firestore";

export function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

export async function register(name,email,password,age,income,state){
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if(userCredential && userCredential.user){
           const docRef = await addDoc(collection(db,"users"),{
                age: age,
                email: email,
                income: income,
                state: state,
                name: name,
            });
            console.log("ID: ",docRef.id)
        }
    } catch (error) {
        console.log(error);
    }
    return true;
}
       
               
            
            


export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
            await signInWithPopup(auth, provider);
    } catch (error) {
            console.error("Error signing in with Google", error);
    }
}

export async function signOut() {
    try {
            return auth.signOut();
    } catch (error) {
            console.error("Error signing out with Google", error);
    }
}

export async function login(email, password){
    try {
        const res = await signInWithEmailAndPassword(email, password);
        return res;
    } catch (e){
        return e;
    }
}