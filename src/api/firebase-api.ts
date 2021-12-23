import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { IDataList } from "../models";

export async function sendScoutingData(data) {
  try {
    const docRef = await addDoc(collection(db, "comp1"), {
      team: parseInt(data.team),
      points: parseInt(data.points),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getScoutingData(currentData: IDataList) {
  const ref = collection(db, "comp1");
  const teamList = currentData.map((e) => e.team);
  let docs: QuerySnapshot<DocumentData>;

  if (teamList.length > 0) {
    const q = query(ref, where("team", "not-in", teamList));
    docs = await getDocs(q);
  } else {
    docs = await getDocs(ref);
  }

  let out: IDataList = [];
  docs.forEach((doc) => {
    out = [...out, { team: doc.data().team, points: doc.data().points }];
  });

  return [...currentData, ...out];
}
