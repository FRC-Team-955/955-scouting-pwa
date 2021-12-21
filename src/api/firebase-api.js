import { db } from '../firebase-config';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 

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

export async function getScoutingData(currentData){
    const ref = collection(db, "comp1")
    const teamList = currentData.map((e)=> parseInt(e.team))
    let q = 0
    let docs = 0

    if (teamList.length > 0){
      q = query(ref, where("team", "not-in", teamList))
      docs = await getDocs(q)
    }else{
      docs = await getDocs(ref);
    }
    
    let out = []
    docs.forEach(doc => {
      out = [...out, {"team": doc.data().team, "points": doc.data().points}]
    });

    return [...currentData, ...out]
}