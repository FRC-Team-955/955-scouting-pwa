import Nav from "../components/nav";
import React, { useState, useEffect} from 'react';

import { Container } from "react-bootstrap";
import { getMatchData } from "../api/local-storage";
import { IMatch, IMatchSchedule } from "../models";


export function Settings({matchList}) {
  console.log(matchList)
  // const [scoutingdata, setScoutingData] = useState([]);
  // const [teams, setTeams] = useState<any>([]);
  // const [activevaluething, setActiveValueThing] = useState<number>();
  const [selectedmatch, setSelectedMatch] = useState<string>("");
  // const [matchlist, setMatchList] = useState<IMatchSchedule>();
  const [teamdata , setTeamData] = useState([]);

    useEffect(()=>{
      
    })
  // useEffect(()=>{
  //   getMatchData().then((res:any) => {setScoutingData(res);
  //     let temp:any= res.map((e)=>(
  //       e.teamNumber
  //     ))
  //     let uniqueTeams:any = [];
  //     temp.forEach((element) => {
  //         if (!uniqueTeams.includes(element)) {
  //           uniqueTeams.push(element);
  //         }
  //     });
  //     setTeams(uniqueTeams);
  // })
  // },[]); 
  // useEffect(()=>{
  //   setTeamData(scoutingdata.filter((e:any)=>e.teamNumber === activevaluething))

  // },[activevaluething]);
  return (
    <div>
      <div>
        {/* <select
          value={activevaluething}
          name="Team"
          id="team-select"
          onChange={(m) => setActiveValueThing(parseInt(m.target.value))}
        >
          {teams.length > 0 ? (
            teams.map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))
          ) : (
            <></>
          )}
        </select> */}
        <select
          value={selectedmatch}
          name="Team"
          id="team-select"
          onChange={(m) => setSelectedMatch(m.target.value)}
        >
          {matchList.length > 0 ? (
            matchList.map((e, i) => (
              <option value={e.id} key={i}>
                {e.matchNumber}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
        <h1>Settings Page</h1> 
      </div>
      
      
      <Nav selectedPage={2} />
    </div>
  );
}
