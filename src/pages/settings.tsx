import Nav from "../components/nav";
import React, { useState, useEffect} from 'react';

import { Container } from "react-bootstrap";
import { getMatchData } from "../api/local-storage";


export function Settings() {
  const [scoutingdata, setScoutingData] = useState([]);
  const [teams, setTeams] = useState<any>([]);
  const [activevaluething, setActiveValueThing] = useState<number>();

  const [teamdata , setTeamData] = useState([]);

  useEffect(()=>{
    getMatchData().then((res:any) => {setScoutingData(res);
      let temp:any= res.map((e)=>(
        e.teamNumber
      ))
      let uniqueTeams:any = [];
      temp.forEach((element) => {
          if (!uniqueTeams.includes(element)) {
            uniqueTeams.push(element);
          }
      });
      setTeams(uniqueTeams);
  })
  },[]); 
  useEffect(()=>{
    setTeamData(scoutingdata.filter((e:any)=>e.teamNumber === activevaluething))

  },[activevaluething]);
  return (
    <div>
      <div>
        <select
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
        </select>

        <h1>Settings Page</h1> 
      </div>
      
      
      <Nav selectedPage={2} />
    </div>
  );
}
