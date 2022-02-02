import { get, set } from "idb-keyval";
import { IEvent, ITeamData } from "../models";

// gets all scouting data for a current event and puts that into csv form
export async function generateCSV(eventId) {
  let currentData = [];

  // reads currently stored data
  await get("data").then((val) => (val ? (currentData = val) : currentData));
  currentData = currentData.filter(
    (x: ITeamData) => x.id.substring(0, x.id.indexOf("_")) === eventId
  );
  let csvData = currentData.map(
    (data: ITeamData) =>
      `${data.id},${data.teamNumber},${data.taxi},${data.autoLow},${data.autoHigh},${data.telopLow},${data.telopHigh},${data.climb}`
  );
  return csvData.join("\n");
}

// stores scouter data for one match
export async function storeMatchData(data: ITeamData) {
  let currentData = [];

  // reads currently stored data
  await get("data").then((val) => (val ? (currentData = val) : currentData));

  const index = currentData.findIndex((x: ITeamData) => x.id === data.id); // removes duplicate match
  if (index > -1) currentData.splice(index, 1);
  set("data", [...currentData, data]) // stores new match
    .then(() => {})
    .catch((err) => console.log("It failed!", err));
}

//given a match id, returns all scouting data
export async function getMatchDataFromId(id: string) {
  let currentData = [];

  // reads currently stored data
  await get("data").then((val) => (val ? (currentData = val) : currentData));
  currentData = currentData.filter(
    (x: ITeamData) => x.id.substring(0, x.id.indexOf("-")) === id
  );
  return currentData;
}

// stores an event (matchSchedule) when given a week and the actual schedule
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

// loads all events for a given week
export async function loadMatchSchedules(week: number) {
  return await get(`matchesWeek${week}`).then((val) => val);
}
