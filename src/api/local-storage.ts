import { IEvent, IMatch, IMatchSchedule, ITeamData } from "../models";
import { update, get, set } from "idb-keyval";

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

export async function generateScheduleCSV(id: string) {
  return getLocalMatchesFromEventKey(id).then((res: any) => {
    let csvData = res.map(
      (data: IMatch) =>
        `${data.id},${data.matchType},${data.matchNumber},${data.alliances.blue[0]},${data.alliances.blue[1]},${data.alliances.blue[2]},${data.alliances.red[0]},${data.alliances.red[1]},${data.alliances.red[2]}`
    );
    return csvData.join("\n");
  });
}

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

export async function storeMatches(matches: IMatchSchedule, id: string) {
  set(id, matches);
}

export async function getLocalEventsFromWeek(week: number) {
  let data = [];
  get("localEvents").then((val) => (data = val));
  data = data.filter((e: any) => e.week === week - 1);
  return data;
}

export async function getLocalMatchesFromEventKey(key: string) {
  return get(key).then((val) => val);
}

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

//given a match id, returns all scouting data
export async function loadMatchData(id: string) {
  let currentData = [];

  // reads currently stored data
  await get("data").then((val) => (val ? (currentData = val) : currentData));

  currentData = currentData.filter((x: ITeamData) => x.id === id);
  return currentData[0];
}

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
