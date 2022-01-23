import { get, set } from "idb-keyval";
import { IEvent, ITeamData } from "../models";

export async function generateCSV() {
  return "1,2,3,4,5,6,7\n1,2,3,4,5,6,7";
}

export async function storeMatchData( data: ITeamData) {
  let currentData = [];

  // reads currently stored data
  await get('data').then((val) =>
    val ? (currentData = val) : currentData
  );

  const index = currentData.findIndex((x: ITeamData) => x.id === data.id); // removes duplicate match
  if (index > -1) currentData.splice(index, 1);

  set('data', [...currentData, data]) // stores new match
    .then(() => {})
    .catch((err) => console.log("It failed!", err));

}

export async function getMatchDataFromId(id:string) {
  let currentData = [];

  // reads currently stored data
  await get('data').then((val) =>
    val ? (currentData = val) : currentData
  );
  currentData = currentData.filter((x:ITeamData) => x.id.substring(0,x.id.indexOf('-')) === id)
  return currentData
}

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
