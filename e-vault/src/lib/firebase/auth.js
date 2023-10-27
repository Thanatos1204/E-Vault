import { GoogleAuthProvider } from "firebase/auth";
import { auth,db } from './config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc,setDoc,doc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { storage } from './config';
import { binaryToVideo } from '../../../script4';
export function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

export async function register(Name,email,password,Age,Income,State){
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if(userCredential && userCredential.user){
           const docRef = await addDoc(collection(db,"users"),{
                Age: Age,                
                Income: Income,
                Name: Name,
                State: State,
                
            });
            console.log("ID: ",docRef.id)
        }
    } catch (error) {
        console.log(error);
    }
    return true;
}

export async function updatefile(file,formname,formID){
    try {     
            console.log("I AM READY!")
           const docRef = await addDoc(collection(db,"forms"),
           {
                formname: formname,
                formID: formID

           });         
            console.log("ID: ",docRef.id)
            const video = await binaryToVideo(file).then((video) => {
                console.log("Generated video");
            }).catch((e)=> {
                console.error(e);
            });
            const storageRef = ref(storage, `files/${formID}.mp4`);  
            await uploadBytes(storageRef, video);
            console.log(video.type);
            console.log('File uploaded to storage successfully');  
  
        }catch (error) {
            console.error('Error uploading file to storage:', error);
             console.log("I failed....",error);             
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
        console.log("Pappu Pass");
        return res;
    } catch (e){
        return e;
    }
}