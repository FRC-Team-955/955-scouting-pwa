import "../styles/match.css";
import "../styles/App.css";
import ellipsisImg from "../styles/images/ellipsis-v.png";

import { Card } from "react-bootstrap";

export default function Match({ matchData, openQRgen , openDataEntry}) {
  return (
    <Card
      style={{ width: "20.5rem", height: "8.6875rem", margin: "1rem auto" }}
    >
      <Card.Body>
        <div className="font">
          <p>Match {matchData.matchNumber}</p>
        </div>

        <div>
          <button className="bluebutton" onClick={() =>openDataEntry(matchData.matchNumber ,matchData.alliances.blue.teams[0])}>
            <span>{matchData.alliances.blue.teams[0]}</span>
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={() => openQRgen(matchData.alliances.blue.teams[0])}
            />
          </button>
          <button className="bluebutton">
            {matchData.alliances.blue.teams[1]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={() => openQRgen(matchData.alliances.blue.teams[1])}
            />
          </button>
          <button className="bluebutton">
            {matchData.alliances.blue.teams[2]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={() => openQRgen(matchData.alliances.blue.teams[2])}
            />
          </button>
        </div>
        <div>
          <button className="redbutton">
            {matchData.alliances.red.teams[0]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={() => openQRgen(matchData.alliances.red.teams[0])}
            />
          </button>
          <button className="redbutton">
            {matchData.alliances.red.teams[1]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={() => openQRgen(matchData.alliances.red.teams[1])}
            />
          </button>
          <button className="redbutton">
            {matchData.alliances.red.teams[2]}{" "}
            <img
              className="ellipsis"
              width="30px"
              height="30px"
              alt=""
              src={ellipsisImg}
              onClick={() => openQRgen(matchData.alliances.red.teams[2])}
            />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
