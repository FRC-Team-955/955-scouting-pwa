// https://www.thebluealliance.com/apidocs/v3
// https://www.thebluealliance.com/api/v3/
// All data is from 2022 because 2022 data is not complete

const header = {
  headers: {
    "X-TBA-Auth-Key":
      "uhUoGlJjyNOwaMSNKoepUTTIeRiIjOmwRoh5lCd6lK4e2dd2pejmWVpx4xuq76sh ",
  },
};
const api = "https://www.thebluealliance.com/api/v3";

// returns a list of events in 2022 for a given week
export async function getEventsFromWeek(week: number) {
  const eventList = await fetch(`${api}/events/2022`, header)
    .then((res) => res.json())
    .then(
      (result) => {
        return result.filter((comp) => comp.week === week - 1); // TBA weeks start at 0, this line selects the events that are in the correct week
      },
      (error) => {
        console.log(error);
      }
    );

  return eventList.map((e) => {
    // changes data shape from TBAEvent to Event
    return {
      id: e.key,
      name: e.name,
      location: e.city,
      start_date: e.start_date,
      week,
      matches: [],
    };
  });
}

// gets event and match schedule from given key
export async function getEventFromKey(key: string) {
  const frcEvent = await fetch(`${api}/event/${key}`, header)
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        console.log(error);
      }
    );
  const matchList = await getMatchesFromEventKey(key); //adds in match schedule
  return {
    id: frcEvent.key,
    name: frcEvent.name,
    location: frcEvent.city,
    start_date: frcEvent.start_date,
    week: frcEvent.week,
    matches: matchList,
  };
}

//returns a list of matches sorted by time
export async function getMatchesFromEventKey(key: string) {
  const matchArray = await fetch(`${api}/event/${key}/matches`, header)
    .then((res) => res.json())
    .then(
      (result) => {
        let arr = result.sort((a, b) => a.time - b.time); //sorts array times from lowest to highest
        return arr;
      },
      (error) => {
        throw new Error("match not found of TBA tba.ts: line 72");
      }
    )
    .catch((err) => {
      throw Error(err);
    });

  return matchArray.map((e) => {
    // changes data shape
    return {
      id: e.key,
      matchType: e.comp_level,
      matchNumber: e.match_number,
      time: e.time,
      isVerified: false,
      isAllDataEntered: false,
      isDataUploaded: false,
      alliances: {
        red: {
          teams: e.alliances.red.team_keys.map((x) => parseInt(x.substring(3))),
          data: [],
        },
        blue: {
          teams: e.alliances.blue.team_keys.map((x) =>
            parseInt(x.substring(3))
          ),
          data: [],
        },
      },
    };
  });
}
