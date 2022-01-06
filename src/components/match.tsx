// This component should contain a box with the 6 buttons for each team
import "../styles/match.css";   
import { match } from "assert";
import "../styles/App.css";  

import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";

export default function Match({matchData}){

const blue = matchData.alliances.blue.team_keys.map(x => x.substring(3));
const red = matchData.alliances.red.team_keys.map(x => x.substring(3));
    return (
     
<Card style={{ width: '20.5rem' , height: '8.6875rem'}}>
  <Card.Body>
    <div className="font">
      <p>Match {matchData.match_number}</p>
    </div>

    
    <div>
      <button className="bluebutton">{blue[0]}</button>
      <button className="bluebutton">{blue[1]}</button>
      <button className="bluebutton">{blue[2]}</button>
    </div>
    <div>
      <button className="redbutton">{red[0]}</button>
      <button className="redbutton">{red[1]}</button>
      <button className="redbutton">{red[2]}</button>
    </div>
  </Card.Body>
</Card>
           
    )
}
/* <h4>Match {matchData.match_number}</h4>
<h6>Blue</h6>
<p className = "frame2">{matchData.alliances.blue.team_keys[0]}</p>
<p className = "frame2">{matchData.alliances.blue.team_keys[1]}</p>
<p className = "frame2">{matchData.alliances.blue.team_keys[2]}</p>
<h6>Red</h6>
<p className = "frame2">{matchData.alliances.red.team_keys[0]}</p>
<p className = "frame2">{matchData.alliances.red.team_keys[1]}</p>
<p className = "frame2">{matchData.alliances.red.team_keys[2]}</p>
*/