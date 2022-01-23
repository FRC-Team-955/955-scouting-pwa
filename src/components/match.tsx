import "../styles/match.css";
import "../styles/App.css";
import ellipsisImg from "../styles/images/ellipsis-v.png";

import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getMatchDataFromId } from "../api/local-storage";
import { ITeamData } from "../models";
import DataEntry from "./data-entry";

export default function Match({ matchData, openQRgen}) {
  const [teamData, setTeamData] = useState([])
  const [showDataEntry, setShowDataEntry] = useState(false)
  const [dataEntryData, setDataEntryData] = useState<any>(null)

  useEffect(() => {
    getMatchDataFromId(matchData.id).then(res=>setTeamData(res))
  })

  function openDataEntry(color, index){
    if(color === 'b'){
      setDataEntryData(teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.blue.teams[index])||{teamNumber: matchData.alliances.blue.teams[index]}); 
      setShowDataEntry(true);
    }else{
      setDataEntryData(teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.red.teams[index])||{teamNumber: matchData.alliances.red.teams[index]}); 
      setShowDataEntry(true);
    }
    
  }

  return (
    <Card
      style={{ width: "20.5rem", height: "8.6875rem", margin: "1rem auto" }}
    >
      <Card.Body>
      {showDataEntry ? (
        <DataEntry
          exit={() => {setShowDataEntry(false); getMatchDataFromId(matchData.id).then(res=>setTeamData(res))}}
          matchNumber={matchData.matchNumber}
          matchId={matchData.id}
          data={dataEntryData}
        />
      ) : (
        <></>
      )}
        <div className="font">
          <p>Match {matchData.matchNumber}</p>
        </div>

        <div>
          <button className="bluebutton" onClick={() => openDataEntry('b', 0)} style={{'background': teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.blue.teams[0])?'rgba(47, 128, 237, 0.1)':'none'}}>
            <span>{matchData.alliances.blue.teams[0]}</span>
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {e.stopPropagation(); openQRgen(teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.blue.teams[0]))}}
            />
          </button>
          <button className="bluebutton" onClick={() => openDataEntry('b', 1)}  style={{'background': teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.blue.teams[1])?'rgba(47, 128, 237, 0.1)':'none'}}>
            {matchData.alliances.blue.teams[1]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {e.stopPropagation(); openQRgen(teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.blue.teams[1]))}}
            />
          </button>
          <button className="bluebutton" onClick={() => openDataEntry('b', 2)}  style={{'background': teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.blue.teams[2])?'rgba(47, 128, 237, 0.1)':'none'}}>
            {matchData.alliances.blue.teams[2]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {e.stopPropagation(); openQRgen(teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.blue.teams[2]))}}
            />
          </button>
        </div>
        <div>
          <button className="redbutton" onClick={() => openDataEntry('r', 0)}  style={{'background': teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.red.teams[0])?'rgba(235, 87, 87, 0.1)':'none'}}>
            {matchData.alliances.red.teams[0]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {e.stopPropagation(); openQRgen(teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.red.teams[0]))}}
            />
          </button>
          <button className="redbutton" onClick={() => openDataEntry('r', 1)} style={{'background': teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.red.teams[1])?'rgba(235, 87, 87, 0.1)':'none'}}>
            {matchData.alliances.red.teams[1]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {e.stopPropagation(); openQRgen(teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.red.teams[1]))}}
            />
          </button>
          <button className="redbutton" onClick={() => openDataEntry('r', 2)} style={{'background': teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.red.teams[2])?'rgba(235, 87, 87, 0.1)':'none'}}>
            {matchData.alliances.red.teams[2]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {e.stopPropagation(); openQRgen(teamData.find((x: ITeamData) => x.teamNumber === matchData.alliances.red.teams[2]))}}
            />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
