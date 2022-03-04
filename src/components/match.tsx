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
  const [hide, setHide] = useState(false);

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
      style={{
        width: "20.5rem",
        height: "8.6875rem",
        margin: "1rem auto",
        display: hide ? "none" : "block",
      }}
    >
      <Card.Body>
        {showDataEntry ? (
          <DataEntry
            exit={() => {
              setShowDataEntry(false);
              getMatchDataFromId(matchData.id).then((res) => setTeamData(res)); // refreshes teamData by pulling from local storage
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              width="20px"
              style={{ cursor: "pointer", float: "right" }}
              onClick={() => setHide(true)}
            >
              <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM189.8 123.5L235.8 159.5C258.3 139.9 287.8 128 320 128C390.7 128 448 185.3 448 256C448 277.2 442.9 297.1 433.8 314.7L487.6 356.9C521.1 322.8 545.9 283.1 558.6 256C544.1 225.1 518.4 183.5 479.9 147.7C438.8 109.6 385.2 79.1 320 79.1C269.5 79.1 225.1 97.73 189.8 123.5L189.8 123.5zM394.9 284.2C398.2 275.4 400 265.9 400 255.1C400 211.8 364.2 175.1 320 175.1C319.3 175.1 318.7 176 317.1 176C319.3 181.1 320 186.5 320 191.1C320 202.2 317.6 211.8 313.4 220.3L394.9 284.2zM404.3 414.5L446.2 447.5C409.9 467.1 367.8 480 320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L120.8 191.2C102.1 214.5 89.76 237.6 81.45 255.1C95.02 286 121.6 328.5 160.1 364.3C201.2 402.4 254.8 432 320 432C350.7 432 378.8 425.4 404.3 414.5H404.3zM192 255.1C192 253.1 192.1 250.3 192.3 247.5L248.4 291.7C258.9 312.8 278.5 328.6 302 333.1L358.2 378.2C346.1 381.1 333.3 384 319.1 384C249.3 384 191.1 326.7 191.1 255.1H192z" />
            </svg>
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
