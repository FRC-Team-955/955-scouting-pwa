// This component should contain a box with the 6 buttons for each team
import "../styles/match.css";
import "../styles/App.css";

import { Card } from "react-bootstrap";

export default function Match({ matchData }) {
  return (
    <Card
      style={{ width: "20.5rem", height: "8.6875rem", margin: "1rem auto" }}
    >
      <Card.Body>
        <div className="font">
          <p>Match {matchData.matchNumber}</p>
        </div>

        <div>
          <button className="bluebutton">
            {matchData.alliances.blue.teams[0]}
          </button>
          <button className="bluebutton">
            {matchData.alliances.blue.teams[1]}
          </button>
          <button className="bluebutton">
            {matchData.alliances.blue.teams[2]}
          </button>
        </div>
        <div>
          <button className="redbutton">
            {matchData.alliances.red.teams[0]}
          </button>
          <button className="redbutton">
            {matchData.alliances.red.teams[1]}
          </button>
          <button className="redbutton">
            {matchData.alliances.red.teams[2]}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
