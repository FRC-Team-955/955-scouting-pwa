import { get, set } from "idb-keyval";
import { IEvent } from "../models";

export async function generateCSV() {
  return "1,2,3,4,5,6,7\n1,2,3,4,5,6,7";
}

export function storeMatchData() {}

export async function storeMatchSchedule(week: number, data: IEvent) {
  let currentMatchList = [];

  // reads currently stored matches
  await get(`matchesWeek${week}`).then((val) =>
    val ? (currentMatchList = val) : currentMatchList
  );

  const index = currentMatchList.findIndex((x: IEvent) => x.id === data.id); // removes duplicate match
  if (index > -1) currentMatchList.splice(index, 1);

  set(`matchesWeek${week}`, [...currentMatchList, data]) // stores new match
    .then(() => {})
    .catch((err) => console.log("It failed!", err));
}

export async function loadMatchSchedules(week: number) {
  return await get(`matchesWeek${week}`).then((val) => val);
}
