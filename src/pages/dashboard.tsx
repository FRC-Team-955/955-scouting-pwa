import {useEffect, useState} from 'react';

import "../styles/dashboard.css";

import Nav from '../components/nav';
import Match from '../components/match';

import {getEventsFromWeek, getMatchesFromEventKey} from '../api/tba'
import { IEvent, IMatch } from '../models';

export default function Dashboard(){
    const [weekNumber, setWeekNumber] = useState(1)
    const [eventList, setEventList] = useState<Array<IEvent> | null>()
    const [matchSchedule, setMatchSchedule] = useState<Array<IMatch>>([])
    //setting initial state for week
    const getInitialState = () => {
        const value = "None";
        return value;
      };
    
    const [week, setWeek] = useState(getInitialState);
    const [event, setEvent] = useState(getInitialState);
    //On change of dropdown selection, change week and update listed challenges
    // pretty sure this doesnt work the way its supposed to but ill fix it later when i actually understand it
    const handleChange = (e) => {
        setWeek(e.target.value);
        getEventsFromWeek(parseInt(week)).then(e => {
            setEventList(e);
            // getMatchesFromEvent(e[0]).then(f => {setMatchSchedule(f); console.log(f)})
        });
        
    };
    const matchChange= (m) => {
        console.log(m)
        setEvent(m);
        getMatchesFromEventKey(m).then(s => {
            setMatchSchedule(s);
            
            // getMatchesFromEvent(e[0]).then(f => {setMatchSchedule(f); console.log(f)})
        });
        
        
    };
    
    // This is an example of getting the match schedule of the 0th match in week 1 
    
    // useEffect(() => {
    //     getEventsFromWeek(1).then(e => {
    //         setEventList(e);
    //         getMatchesFromEvent(e[0]).then(f => {setMatchSchedule(f); console.log(f)})
    //     });
    // }, [weekNumber])

    return(
        <div>
           
            <div className='weeklist'>
               
                {/* Top select is for choosing week, bottom is for choosing comp */}
                {/* Pass the value of the top select into getEvetnsFromWeek and set eventList. Pass the selected match into getMatchesFromEvent to get the schedule */}
                <select value={week} id="week-event" onChange={handleChange}>
                <option value="1">Week 1</option>
                <option value="2">Week 2</option>
                <option value="3">Week 3</option>
                <option value="4">Week 4</option>
                <option value="5">Week 5</option>
                <option value="6">Week 6</option>
                </select>
            </div>
            
            <div className='eventlist'>
                <select value={event} name="Event" id="event-name" onChange={matchChange}>
                    {eventList ? eventList.map((e,i) => <option value={e.key} key={i}>{e.name}</option>) : <></>}
                </select>
            </div> 
            
            <div className='matches'>
                <p>Matches</p>
            </div>

            <div>
            {matchSchedule.length > 0 ? matchSchedule.map((data, index)=><Match key={index} matchData={data}/>) : <></>}
                {/* Map through matchSchedule to generate a list of <Match/>, add props */}
            </div>
            <Nav/>
        </div>
    )
}