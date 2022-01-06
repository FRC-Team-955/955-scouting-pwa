// https://www.thebluealliance.com/apidocs/v3
// https://www.thebluealliance.com/api/v3/
// All data is from 2020 because 2022 data is not complete

import { ICurrentEvent } from "../models";

const header = {
    headers: {'X-TBA-Auth-Key':'uhUoGlJjyNOwaMSNKoepUTTIeRiIjOmwRoh5lCd6lK4e2dd2pejmWVpx4xuq76sh '}
}
const api = "https://www.thebluealliance.com/api/v3"

// returns a list of events in 2020 for a given week
export async function getEventsFromWeek(week: number):Promise<any>{
    const eventList = await fetch(`${api}/events/2020`, header)
      .then(res => res.json())
      .then(
        (result) => {
          return result.filter(comp => comp.week === week-1) // week index startskey: string at 0
        },
        (error) => {
          console.log(error)
        }
      );
      return eventList.map(e => { return {
        id: e.key,
        name: e.name,
        location: e.city,
        start_date: e.start_date,
        week,
        matches: []
      }})
}

//returns a list of matches sorted by time
export async function getMatchesFromEventKey(key: string){ 
  // console.log(key)
  const matchArray = await fetch(`${api}/event/${key}/matches`, header )
        .then(res => res.json())
        .then(
            (result) => {
              let arr = result.sort((a, b) => a.time - b.time) //sorts array times from lowest to highest
              return arr
            },
            (error) => {
                console.log(error)
            }
        )
        return matchArray.map(e => { return {
          id: e.key,
          matchType: e.comp_level,
          matchNumber: e.match_number,
          time: e.time,
          isVerified: false,
          isAllDataEntered: false,
          isDataUploaded: false,
          alliances: {
            red: {
              teams: e.alliances.red.team_keys.map(x => parseInt(x.substring(3))),
              data: []
            },
            blue: {
              teams: e.alliances.blue.team_keys.map(x => parseInt(x.substring(3))),
              data: []
            }
          }
        }})
  }