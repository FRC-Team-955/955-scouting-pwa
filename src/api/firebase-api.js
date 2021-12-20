import { db } from '../firebase-config';
import { collection, addDoc } from "firebase/firestore"; 

export async function sendScoutingData(data){
    try {
        const docRef = await addDoc(collection(db, "comp1"), {
          team: parseInt(data.team),
          points: parseInt(data.points)
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}