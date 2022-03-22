import { useState, useContext } from "react";
import { storeMatchData } from "../api/local-storage";
import Nav from "../components/nav";
import QRCode from "qrcode";
import { SelectedEvent } from "../context";
import { transform } from "typescript";

function Offline() {
  const { selectedEvent, setSelectedEvent } = useContext(SelectedEvent);
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
  const [showQR, setShowQR] = useState(false);

  const [qr, setQr] = useState("");
  async function generateQR(text) {
    try {
      setQr(await QRCode.toDataURL(text)); // generates qr image and returns url of image
    } catch (err) {
      console.error(err);
    }
  }

  function storeData() {
    const id = `${selectedEvent.id}_qm${matchNumber}-${teamNumber.toString()}*${
      (matchNumber - 1) * 6 + color + dsNumber
    }`;
    storeMatchData({
      id,
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
    generateQR(
      `${id},${teamNumber},${taxi},${autoLow},${autoHigh},${telopLow},${telopHigh},${defense},${climb}, ${notes}`
    );
    setShowQR(true);
    console.log(id);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="card"
        style={{ width: "35rem", maxWidth: "93%", margin: "3rem 0 5rem 0" }}
      >
        <div className="card-body">
          <h3>Offline data entry for: {selectedEvent.id}</h3>

          <form>
            <div className="data-group">
              <h5>Info</h5>
              <div className="form-group">
                <label htmlFor="team-number">Event ID: </label>
                <div className="data-form-inputs" id="team-number">
                  <input
                    type="text"
                    value={selectedEvent.id}
                    onChange={(e) => setSelectedEvent({ id: e.target.value })}
                  ></input>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="team-number">Team Number: </label>
                <div className="data-form-inputs" id="team-number">
                  <input
                    type="number"
                    value={teamNumber === 0 ? "" : teamNumber}
                    onChange={(e) => setTeamNumber(parseInt(e.target.value))}
                  ></input>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="match-number">Match Number: </label>
                <div className="data-form-inputs" id="match-number">
                  <input
                    type="number"
                    value={matchNumber === 0 ? "" : matchNumber}
                    onChange={(e) => setMatchNumber(parseInt(e.target.value))}
                  ></input>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "0",
                }}
              >
                <div
                  style={{
                    marginRight: "2rem",
                    marginBottom: "0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <div style={{ marginBottom: "0" }}>
                    <input
                      type="radio"
                      onChange={() => setColor(0)}
                      checked={color === 0}
                    />{" "}
                    Red
                  </div>
                  <div style={{ marginBottom: "0" }}>
                    <input
                      type="radio"
                      onChange={() => setColor(3)}
                      checked={color === 3}
                    />{" "}
                    Blue
                  </div>
                </div>
                <div style={{ marginBottom: "0" }}>
                  <input
                    type="radio"
                    onChange={() => setDsNumber(0)}
                    checked={dsNumber === 0}
                  />
                  1
                  <br />
                  <input
                    type="radio"
                    onChange={() => setDsNumber(1)}
                    checked={dsNumber === 1}
                  />
                  2
                  <br />
                  <input
                    type="radio"
                    onChange={() => setDsNumber(2)}
                    checked={dsNumber === 2}
                  />
                  3
                </div>
              </div>
            </div>
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
                    onChange={(e) =>
                      setNotes(e.target.value.replaceAll(",", ";"))
                    }
                    maxLength={130}
                    rows={4}
                    cols={35}
                  />
                </div>
              </div>
            </div>
          </form>
          <button className="btn btn-primary" onClick={storeData}>
            Show QR
          </button>
          {showQR ? (
            <div
              className="qrcard card"
              style={{ width: "16rem", height: "20rem" }}
            >
              <div className="card-body">
                <svg onClick={() => setShowQR(false)} viewBox="0 0 320 512">
                  <path
                    fill="currentColor"
                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                  ></path>
                </svg>
                <h4>Team: {teamNumber}</h4>
                <img src={qr} alt=""></img>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "3.2rem", marginTop: "0rem" }}
                  onClick={() => {
                    setTaxi(false);
                    setAutoLow(0);
                    setAutoHigh(0);
                    setTelopLow(0);
                    setTelopHigh(0);
                    setDefense(0);
                    setClimb(0);
                    setNotes("");
                    setTeamNumber(0);
                    setMatchNumber(matchNumber + 1);
                    setShowQR(false);
                  }}
                >
                  New Match
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Nav selectedPage={2} />
    </div>
  );
}

export default Offline;
