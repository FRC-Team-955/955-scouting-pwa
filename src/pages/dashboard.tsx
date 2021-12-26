import {useEffect, useState} from 'react';

import Nav from '../components/nav';
import Match from '../components/match';

import {getEventsFromWeek, getMatchesFromEvent} from '../api/tba'
import { IEvent, IMatch } from '../models';

export default function Dashboard(){
    const [weekNumber, setWeekNumber] = useState(1)
    const [eventList, setEventList] = useState<Array<IEvent> | null>()
    const [matchSchedule, setMatchSchedule] = useState<Array<IMatch> | null>()

    // This is an example of getting the match schedule of the 0th match in week 1
    useEffect(() => {
        getEventsFromWeek(1).then(e => {
            setEventList(e);
            getMatchesFromEvent(e[0]).then(f => setMatchSchedule(f))
        });
    }, [weekNumber])

    return(
        <div>
            <div>
                {/* Top select is for choosing week, bottom is for choosing comp */}
                {/* Pass the value of the top select into getEvetnsFromWeek and set eventList. Pass the selected match into getMatchesFromEvent to get the schedule */}
                <select></select>
                <select></select>
            </div>
            <h2>Matches</h2>
            <div>
                {/* Map through matchSchedule to generate a list of <Match/>, add props */}
                <Match/>
                <Match/>
            </div>
            <Nav/>
        </div>
    )
}