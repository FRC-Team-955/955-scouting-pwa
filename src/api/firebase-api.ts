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

export async function sendMatchDataFirebase(data: ITeamData) {
  try {
    const ref = collection(db, "scouting_data");
    const q = query(ref, where("id", "==", data.id));
    let doc = await getDocs(q);
    doc.forEach((d) => deleteDoc(d.ref));
    const docRef = await addDoc(collection(db, "scouting_data"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getMatchDataFirebase() {
  const ref = collection(db, "scouting_data");
  let docs: any = await getDocs(ref);
  let out: any = [];
  docs.forEach((doc) => {
    out = [...out, doc.data()];
  });
  for (let i = 0; i < out.length; i++) {
    await storeMatchData(out[i]);
  }
}
