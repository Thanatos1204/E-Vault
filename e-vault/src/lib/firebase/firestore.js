import { doc, setDoc , addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase/config";
// export async function uploadfile(fname,fid){
//     try {
//           const docRef = doc(collection(db,"forms"),{
//                 fname: fname,
//                 fid: fid,               
//             });
//             console.log("ID: ",docRef.id)
//             return true;
//         }catch (error) {
//         console.log(error);
//         return false;
//     }
    
// }

// const updatefile = async (
//     transaction,
//     docRef,
//     newFileDocument,
//     fname
// ) => {
//     const file = await transaction.get(docRef);
//     const data = file.data();
    

//     transaction.update(docRef, {
//             fname: newfname,
//            fid: newfid,            
//     });

//     transaction.set(newFileDocument, {
//             ...fname,
//             timestamp: Timestamp.fromDate(new Date()),
//     });
// };

// export async function updateFiles(db, fid, fname) {
    

//     try {
//             const docRef = doc(collection(db, "forms"), fid);
//             const newFileDocument = doc(
//                     collection(db, `forms/${fid}`)
//             );

//             await runTransaction(db, transaction =>
//                     updatefile(transaction, docRef, newFileDocument, fname)
//             );
//     } catch (error) {
//             console.error(
//                     "There was an error adding the rating to the restaurant.",
//                     error
//             );
//             throw error;
//     }
// }

export async function updatefile(formname,formID){
    try {     
            console.log("I AM READY!")
           const docRef = await addDoc(collection(db,"forms"),
           {
                formname: formname,
                formID: formID

           });
          
            console.log("ID: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",docRef.id)
        }catch (error) {
             console.log("I failed....",error);
             console.log("I failed....",error);
             console.log("I failed....",error);
             console.log("I failed....",error);
             console.log("I failed....",error);
             console.log("I failed....",error);
    }
    return true;
}