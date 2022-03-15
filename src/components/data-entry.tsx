import { useState, useContext, useEffect } from "react";
import { loadMatchData, storeMatchData } from "../api/local-storage";
import { HasData } from "../context";
import "../styles/data-entry.css";

function DataEntry({
  exit,
  hasDataIndex,
  teamNumber,
  matchId,
}: {
  exit: any;
  hasDataIndex: number;
  teamNumber: number;
  matchId: string;
}) {
  const { hasData, setHasData } = useContext(HasData);
  const [taxi, setTaxi] = useState(false);
  const [autoLow, setAutoLow] = useState(0);
  const [autoHigh, setAutoHigh] = useState(0);
  const [telopLow, setTelopLow] = useState(0);
  const [telopHigh, setTelopHigh] = useState(0);
  const [defense, setDefense] = useState(0);
  const [climb, setClimb] = useState(0);
  const [notes, setNotes] = useState("");

  function storeData() {
    const newHasData = [...hasData];
    newHasData[hasDataIndex] = true;
    setHasData(newHasData);
    storeMatchData({
      id: `${matchId}-${teamNumber.toString()}*${hasDataIndex}`,
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

  useEffect(() => {
    if (hasData[hasDataIndex]) {
      loadMatchData(`${matchId}-${teamNumber.toString()}*${hasDataIndex}`).then(
        (res: any) => {
          setTaxi(res.taxi);
          setAutoLow(res.autoLow);
          setAutoHigh(res.autoHigh);
          setTelopLow(res.telopLow);
          setTelopHigh(res.telopHigh);
          setDefense(res.defense);
          setClimb(res.climb);
          setNotes(res.notes);
        }
      );
    }
  }, [hasData, hasDataIndex, matchId, teamNumber]);

  return (
    <div className="card data-card">
      <h3 className="card-body">
        {teamNumber}
        <svg
          onClick={() => {
            exit();
            storeData();
          }}
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
          ></path>
        </svg>
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
    </div>
  );
}

export default DataEntry;
