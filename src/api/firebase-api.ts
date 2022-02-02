import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { ITeamData } from "../models";
import { storeMatchData } from "./local-storage";

// stores scouting data on Firebase
export async function sendMatchDataFirebase(data: ITeamData) {
  try {
    const ref = collection(db, "scouting_data");
    const q = query(ref, where("id", "==", data.id));
    let doc = await getDocs(q); // this line and the 2 above it find data on firebase that is for the same team to avoid duplicates
    doc.forEach((d) => deleteDoc(d.ref)); // deletes duplicate data
    const docRef = await addDoc(collection(db, "scouting_data"), data);
    console.log("Document written with ID: ", docRef.id); // stores document
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// receives soouting data from Firebase and sends to local storage
export async function getMatchDataFirebase() {
  const ref = collection(db, "scouting_data");
  let docs: any = await getDocs(ref); // these 2 lines get all scouting data
  let out: any = [];
  docs.forEach((doc) => {
    out = [...out, doc.data()]; // turns data into an array
  });
  for (let i = 0; i < out.length; i++) {
    await storeMatchData(out[i]); // for each index in the array, store the data, and then wait for the opperation to complete
  }
}
