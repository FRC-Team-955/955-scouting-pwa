import { useState } from "react";
import { sendMatchDataFirebase } from "../api/firebase-api";
import { storeMatchData } from "../api/local-storage";
import { IEvent } from "../models";
import "../styles/data-entry.css";

interface dataEntryProps {
  exit: Function;
  data: any;
  matchNumber: number;
  matchId: string;
}

export default function DataEntry({
  exit,
  matchNumber,
  matchId,
  data,
}: dataEntryProps) {
  const [taxi, setTaxi] = useState(data?.taxi || false);
  const [autoLow, setAutoLow] = useState(data?.autoLow || 0);
  const [autoHigh, setAutoHigh] = useState(data?.autoHigh || 0);
  const [telopLow, setTelopLow] = useState(data?.telopLow || 0);
  const [telopHigh, setTelopHigh] = useState(data?.telopHigh || 0);
  const [climb, setClimb] = useState(data?.climb || 0);

  function saveData(e, forceSave = true) {
    e?.preventDefault();
    if (
      forceSave ||
      taxi !== false ||
      autoLow !== 0 ||
      autoHigh !== 0 ||
      telopLow !== 0 ||
      telopHigh !== 0 ||
      climb !== 0
    ) {
      storeMatchData({
        id: `${matchId}-${data.teamNumber.toString()}`,
        teamNumber: data.teamNumber,
        taxi,
        autoLow,
        autoHigh,
        telopLow,
        telopHigh,
        climb,
      });
      if (!forceSave && navigator.onLine) {
        sendMatchDataFirebase({
          id: `${matchId}-${data.teamNumber.toString()}`,
          teamNumber: data.teamNumber,
          taxi,
          autoLow,
          autoHigh,
          telopLow,
          telopHigh,
          climb,
        });
      }
    }
  }

  return (
    <div className="card data-card">
      <div className="card-body">
        <h3>
          Match {matchNumber}: {data.teamNumber}
          <svg
            onClick={() => {
              saveData(null, false);
              exit();
            }}
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
            ></path>
          </svg>
        </h3>
      </div>
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
        </div>
        <button className="btn btn-primary" onClick={saveData}>
          Save Data
        </button>
      </form>
    </div>
  );
}
