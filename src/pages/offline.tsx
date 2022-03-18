import { useState } from "react";
import { storeMatchData } from "../api/local-storage";
import Nav from "../components/nav";

function Offline(){
    const [taxi, setTaxi] = useState(false);
    const [autoLow, setAutoLow] = useState(0);
    const [autoHigh, setAutoHigh] = useState(0);
    const [telopLow, setTelopLow] = useState(0);
    const [telopHigh, setTelopHigh] = useState(0);
    const [defense, setDefense] = useState(0);
    const [climb, setClimb] = useState(0);
    const [notes, setNotes] = useState("");
    const [teamNumber, setTeamNumber] = useState<number>(0);
    const [matchNumber, setMatchNumber] = useState<number>(0);
    const [color, setColor] = useState<number>(0);
    const [dsNumber, setDsNumber] = useState<number>(0);

    function storeData() {
        storeMatchData({
          id: `${'2022caph_qm'+matchNumber.toString()}-${teamNumber.toString()}*${(matchNumber-1) * 6 + 0}`,
          teamNumber: teamNumber,
          taxi,
          autoLow,
          autoHigh,
          telopLow,
          telopHigh,
          defense,
          climb,
          notes,
        });
      }

    return(
    <div>
        <div>
        <h3 className="card-body">
        <div className="form-group">
            <label htmlFor="highball-telop">Team Number: </label>
            <div className="data-form-inputs" id="highball-telop">
              <input type="text" value={teamNumber} onChange={(e)=>setTeamNumber(parseInt(e.target.value)||0)}></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="highball-telop">Match Number: </label>
            <div className="data-form-inputs" id="highball-telop">
              <input type="text" value={matchNumber} onChange={(e)=>setMatchNumber(parseInt(e.target.value)||0)}></input>
            </div>
          </div>
      </h3>
      <form>
        <div className="data-group">
          <h5>Auto</h5>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              placeholder="taxi"
              id="taxi-check"
              defaultChecked={taxi}
              checked={taxi}
              onChange={(e) => setTaxi(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="taxi-check">
              Taxi
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="lowball-auto">balls in low: </label>
            <div className="data-form-inputs" id="lowball-auto">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setAutoLow(Math.max(autoLow - 1, 0));
                }}
              >
                -
              </button>
              <span>{autoLow}</span>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setAutoLow(autoLow + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="highball-auto">balls in high: </label>
            <div className="data-form-inputs" id="highball-auto">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setAutoHigh(Math.max(autoHigh - 1, 0));
                }}
              >
                -
              </button>
              <span>{autoHigh}</span>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setAutoHigh(autoHigh + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="data-group">
          <h5>Telop</h5>
          <div className="form-group">
            <label htmlFor="lowball-telop">balls in low: </label>
            <div className="data-form-inputs" id="lowball-telop">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setTelopLow(Math.max(telopLow - 1, 0));
                }}
              >
                -
              </button>
              <span>{telopLow}</span>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setTelopLow(telopLow + 1);
                }}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="highball-telop">balls in high: </label>
            <div className="data-form-inputs" id="highball-telop">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setTelopHigh(Math.max(telopHigh - 1, 0));
                }}
              >
                -
              </button>
              <span>{telopHigh}</span>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setTelopHigh(telopHigh + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="defense-telop">defense (0-2): </label>
            <div className="data-form-inputs" id="defense-telop">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setDefense(Math.max(defense - 1, 0));
                }}
              >
                -
              </button>
              <span>{defense}</span>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setDefense(Math.min(defense + 1, 2));
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="climb-telop">level of climb: </label>
            <div className="data-form-inputs" id="climb-telop">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setClimb(Math.max(climb - 1, 0));
                }}
              >
                -
              </button>
              <span>{climb}</span>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setClimb(Math.min(climb + 1, 4));
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="notes">notes (130 chars): </label>
            <br />
            <div className="data-form-inputs" id="notes">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value.replaceAll(",", ";"))}
                maxLength={130}
                rows={4}
                cols={35}
              />
            </div>
          </div>
        </div>
      </form>
      <button className="btn btn-primary" onClick={storeData}>Save Data</button>
        </div>
        <Nav selectedPage={2}/>
    </div>
    )
}

export default Offline;