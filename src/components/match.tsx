import "../styles/match.css";
import "../styles/App.css";
import ellipsisImg from "../styles/images/ellipsis-v.png";

import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getMatchDataFromId } from "../api/local-storage";
import { ITeamData } from "../models";
import DataEntry from "./data-entry";

export default function Match({ matchData, openQRgen }) {
  const [teamData, setTeamData] = useState([]); // an array with scouting data for each team member in a match
  const [showDataEntry, setShowDataEntry] = useState(false); // wheather to show the data entry form
  const [dataEntryData, setDataEntryData] = useState<any>(null); // scouting data to send to the data entry form

  useEffect(() => {
    getMatchDataFromId(matchData.id).then((res) => setTeamData(res)); // loads tean data from ls
  });

  function openDataEntry(color, index) {
    if (color === "b") {
      setDataEntryData(
        teamData.find(
          // find index of teamData with the same team number as the team selected, or, if there is no data yet, send over the team number
          (x: ITeamData) =>
            x.teamNumber === matchData.alliances.blue.teams[index]
        ) || { teamNumber: matchData.alliances.blue.teams[index] }
      );
      setShowDataEntry(true);
    } else {
      setDataEntryData(
        teamData.find(
          // find index of teamData with the same team number as the team selected, or, if there is no data yet, send over the team number
          (x: ITeamData) =>
            x.teamNumber === matchData.alliances.red.teams[index]
        ) || { teamNumber: matchData.alliances.red.teams[index] }
      );
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
            exit={() => {
              setShowDataEntry(false);
              getMatchDataFromId(matchData.id).then((res) => setTeamData(res)); // refreshed teamData by pulling from local storage
            }}
            matchNumber={matchData.matchNumber}
            matchId={matchData.id}
            data={dataEntryData}
          />
        ) : (
          <></>
        )}
        <div id="match-number">
          <p>
            {matchData.matchType === "qm"
              ? "Qualifier "
              : matchData.matchType === "f"
              ? "Final "
              : matchData.matchType === "qf"
              ? "Quarterfinal " + matchData.id[matchData.id.length - 3] + "-"
              : matchData.matchType === "sf"
              ? "Semifinal " + matchData.id[matchData.id.length - 3] + "-"
              : ""}
            {matchData.matchNumber}
          </p>
        </div>

        <div>
          {/* I'm just commenting the first button, this structure repeats ( not DRY :( ) */}
          {/* the style prop sets the background color depending on wheather data exists for that team */}
          <button
            className="bluebutton"
            onClick={() => openDataEntry("b", 0)}
            style={{
              background: teamData.find(
                (x: ITeamData) =>
                  x.teamNumber === matchData.alliances.blue.teams[0]
              )
                ? "rgba(47, 128, 237, 0.1)"
                : "none",
            }}
          >
            <span>{matchData.alliances.blue.teams[0]}</span>
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {
                e.stopPropagation(); // prevents you from clicking both buttons
                openQRgen(
                  // opens the display and sends over scouting data
                  teamData.find(
                    (x: ITeamData) =>
                      x.teamNumber === matchData.alliances.blue.teams[0]
                  )
                );
              }}
            />
          </button>
          <button
            className="bluebutton"
            onClick={() => openDataEntry("b", 1)}
            style={{
              background: teamData.find(
                (x: ITeamData) =>
                  x.teamNumber === matchData.alliances.blue.teams[1]
              )
                ? "rgba(47, 128, 237, 0.1)"
                : "none",
            }}
          >
            {matchData.alliances.blue.teams[1]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {
                e.stopPropagation();
                openQRgen(
                  teamData.find(
                    (x: ITeamData) =>
                      x.teamNumber === matchData.alliances.blue.teams[1]
                  )
                );
              }}
            />
          </button>
          <button
            className="bluebutton"
            onClick={() => openDataEntry("b", 2)}
            style={{
              background: teamData.find(
                (x: ITeamData) =>
                  x.teamNumber === matchData.alliances.blue.teams[2]
              )
                ? "rgba(47, 128, 237, 0.1)"
                : "none",
            }}
          >
            {matchData.alliances.blue.teams[2]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {
                e.stopPropagation();
                openQRgen(
                  teamData.find(
                    (x: ITeamData) =>
                      x.teamNumber === matchData.alliances.blue.teams[2]
                  )
                );
              }}
            />
          </button>
        </div>
        <div>
          <button
            className="redbutton"
            onClick={() => openDataEntry("r", 0)}
            style={{
              background: teamData.find(
                (x: ITeamData) =>
                  x.teamNumber === matchData.alliances.red.teams[0]
              )
                ? "rgba(235, 87, 87, 0.1)"
                : "none",
            }}
          >
            {matchData.alliances.red.teams[0]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {
                e.stopPropagation();
                openQRgen(
                  teamData.find(
                    (x: ITeamData) =>
                      x.teamNumber === matchData.alliances.red.teams[0]
                  )
                );
              }}
            />
          </button>
          <button
            className="redbutton"
            onClick={() => openDataEntry("r", 1)}
            style={{
              background: teamData.find(
                (x: ITeamData) =>
                  x.teamNumber === matchData.alliances.red.teams[1]
              )
                ? "rgba(235, 87, 87, 0.1)"
                : "none",
            }}
          >
            {matchData.alliances.red.teams[1]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {
                e.stopPropagation();
                openQRgen(
                  teamData.find(
                    (x: ITeamData) =>
                      x.teamNumber === matchData.alliances.red.teams[1]
                  )
                );
              }}
            />
          </button>
          <button
            className="redbutton"
            onClick={() => openDataEntry("r", 2)}
            style={{
              background: teamData.find(
                (x: ITeamData) =>
                  x.teamNumber === matchData.alliances.red.teams[2]
              )
                ? "rgba(235, 87, 87, 0.1)"
                : "none",
            }}
          >
            {matchData.alliances.red.teams[2]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={(e) => {
                e.stopPropagation();
                openQRgen(
                  teamData.find(
                    (x: ITeamData) =>
                      x.teamNumber === matchData.alliances.red.teams[2]
                  )
                );
              }}
            />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
