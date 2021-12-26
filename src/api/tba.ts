// https://www.thebluealliance.com/apidocs/v3
// https://www.thebluealliance.com/api/v3/
// All data is from 2020 because 2022 data is not complete

import { IEvent } from "../models"

const header = {
    headers: {'X-TBA-Auth-Key':'uhUoGlJjyNOwaMSNKoepUTTIeRiIjOmwRoh5lCd6lK4e2dd2pejmWVpx4xuq76sh '}
}
const api = "https://www.thebluealliance.com/api/v3"

// returns a list of events in 2020 for a given week
export async function getEventsFromWeek(week: number):Promise<any>{
    return fetch(`${api}/events/2020`, header)
      .then(res => res.json())
      .then(
        (result) => {
          return result.filter(comp => comp.week === week-1) // week index starts at 0
        },
        (error) => {
          console.log(error)
        }
      )
}

//returns a list of matches sorted by time
export async function getMatchesFromEvent(comp: IEvent){ 
    const id = comp.key

    return fetch(`${api}/event/${id}/matches`, header )
        .then(res => res.json())
        .then(
            (result) => {
              return result.sort((a, b) => a.time - b.time) //sorts array times from lowest to highest
            },
            (error) => {
                console.log(error)
            }
        )
}