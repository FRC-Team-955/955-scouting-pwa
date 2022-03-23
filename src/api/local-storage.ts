import { IEvent, IMatch, IMatchSchedule, ITeamData } from "../models";
import { update, get, set } from "idb-keyval";

//reads saved match data and returns a csv with data for a given event
export async function generateCSV(id: string) {
  let currentData = [];

  // reads currently stored data
  await get("data").then((val) => (val ? (currentData = val) : currentData));
  currentData = currentData.filter(
    (x: ITeamData) => x.id.substring(0, x.id.indexOf("_")) === id
  );
  let csvData = currentData.map(
    (data: ITeamData) =>
      `${data.id.substring(0, data.id.indexOf("*"))},${data.id.substring(
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

// generates a schedule csv for a given event
export async function generateScheduleCSV(id: string) {
  return getLocalMatchesFromEventKey(id).then((res: any) => {
    let csvData = res.map(
      (data: IMatch) =>
        `${data.id},${data.matchType},${data.matchNumber},${data.alliances.blue[0]},${data.alliances.blue[1]},${data.alliances.blue[2]},${data.alliances.red[0]},${data.alliances.red[1]},${data.alliances.red[2]}`
    );
    return csvData.join("\n");
  });
}

// stores the IEvent object for a selected event
export async function storeEvent(frcEvent: IEvent) {
  update("localEvents", (val: any) => {
    let newData = val || [];
    const index = newData.findIndex((x: ITeamData) => x.id === frcEvent.id);
    if (index !== -1) {
      newData[index] = frcEvent;
    } else {
      newData = [...newData, frcEvent];
    }
    return newData;
  });
}

// stores the match list for an event
export async function storeMatches(matches: IMatchSchedule, id: string) {
  set(id, matches);
}

// returns a list of IEvents that we have saved locally 
export async function getLocalEventsFromWeek(week: number) {
  return get("localEvents").then((val) => {
    val = val.filter((e: any) => e.week === week - 1);
    return val;
  });
}

// given an event id, return a list of matches
export async function getLocalMatchesFromEventKey(key: string) {
  return get(key).then((val) => val);
}

// store 1 team's scouting data
export async function storeMatchData(data: ITeamData) {
  update("data", (val: any) => {
    let newData = val || [];
    const index = newData.findIndex((x: ITeamData) => x.id === data.id);
    if (index !== -1) {
      newData[index] = data;
    } else {
      newData = [...newData, data];
    }
    return newData;
  });
}

// given a match id, returns all scouting data
export async function loadMatchData(id: string) {
  let currentData = [];

  // reads currently stored data
  await get("data").then((val) => (val ? (currentData = val) : currentData));

  currentData = currentData.filter((x: ITeamData) => x.id === id);
  return currentData[0];
}

// detects which data we saved locally to set the has data context
export async function loadHasData(key: string) {
  let currentData: any = [];
  await get("data").then((val) => (val ? (currentData = val) : currentData));
  currentData = currentData.filter(
    (x: ITeamData) => x.id.substring(0, x.id.indexOf("_")) === key
  );
  currentData = currentData.map((x: ITeamData) =>
    parseInt(x.id.substring(x.id.indexOf("*") + 1))
  );
  currentData = currentData.sort((a: any, b: any) => a - b);

  return currentData;
}
