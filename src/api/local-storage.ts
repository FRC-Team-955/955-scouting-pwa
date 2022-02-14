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
      `${data.id},${data.id.substring(
        data.id.indexOf("_") + 1,
        data.id.indexOf("-")
      )},${data.teamNumber},${data.taxi ? 1 : 0},${data.autoLow},${
        data.autoHigh
      },${data.telopLow},${data.telopHigh},${data.defense},${data.climb},${
        data.notes
      }`
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

//return all scouting data ever
export async function getMatchData() {
  let currentData = [];
  // reads currently stored data
  await get("data").then((val) => (val ? (currentData = val) : currentData));
  return currentData;
}

//returns an array of avg data objects for a givin list of teams
export async function getAvgDataFromTeamList(teamList) {
  let currentData = [];
  // reads currently stored data
  await get("data").then((val) => (val ? (currentData = val) : currentData)); // get all match data
  currentData = currentData.filter(
    (
      x: ITeamData // filter out uneeded teams
    ) => teamList.includes(x.teamNumber)
  );

  let out: any = [];
  if (currentData.length > 0) {
    teamList.forEach((e) => {
      // avg data by team
      out.push({
        id: `${e}Avg`,
        teamNumber: e,
        taxi: 0,
        autoLow: 0,
        autoHigh: 0,
        telopLow: 0,
        telopHigh: 0,
        defense: 0,
        climb: 0,
      });
      let tempArr = currentData.filter((x: ITeamData) => x.teamNumber === e);
      if (tempArr.length > 0) {
        // sum data
        tempArr.forEach((f: ITeamData) => {
          out[out.length - 1].taxi += f.taxi;
          out[out.length - 1].autoLow += f.autoLow;
          out[out.length - 1].autoHigh += f.autoHigh;
          out[out.length - 1].telopLow += f.telopLow;
          out[out.length - 1].telopHigh += f.telopHigh;
          out[out.length - 1].defense += f.defense;
          out[out.length - 1].climb += f.climb;
        });
        out[out.length - 1].taxi /= tempArr.length; // divide
        out[out.length - 1].autoLow /= tempArr.length;
        out[out.length - 1].autoHigh /= tempArr.length;
        out[out.length - 1].telopLow /= tempArr.length;
        out[out.length - 1].telopHigh /= tempArr.length;
        out[out.length - 1].defense /= tempArr.length;
        out[out.length - 1].climb /= tempArr.length;
      }
    });
  }
  return out;
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

// loads single event based on week and id
export async function getEventFromWeekAndId(week, id) {
  let currentMatchList = [];

  // reads currently stored matches
  await get(`matchesWeek${week}`).then((val) =>
    val ? (currentMatchList = val) : currentMatchList
  );
  return currentMatchList.find((x: IEvent) => x.id === id);
}

// loads all events for a given week
export async function loadMatchSchedules(week: number) {
  return await get(`matchesWeek${week}`).then((val) => val);
}
