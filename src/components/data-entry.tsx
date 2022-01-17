import { useState } from "react";
import "../styles/data-entry.css";

export default function DataEntry({ exit, matchNumber, teamNumber }) {
  const [taxi, setTaxi] = useState(false);
  const [autoLow, setAutoLow] = useState(0);
  const [autoHigh, setAutoHigh] = useState(0);
  const [telopLow, setTelopLow] = useState(0);
  const [telopHigh, setTelopHigh] = useState(0);
  const [climb, setClimb] = useState(0);

  return (
    <div className="card data-card">
      <div className="card-body">
        <h3>
          Match {matchNumber}: {teamNumber}
          <svg onClick={exit} viewBox="0 0 320 512">
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
              onChange={(e) => setTaxi(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="taxi-check">
              Taxi
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="lowball-auto">balls in low: </label>
            <input
              className="form-inputs"
              type="number"
              placeholder="0"
              id="lowball-auto"
              value={autoLow}
              onChange={(e) =>
                setAutoLow(Math.max(parseInt(e.target.value), 0))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="highball-auto">balls in high: </label>
            <input
              className="form-inputs"
              type="number"
              placeholder="0"
              value={autoHigh}
              onChange={(e) =>
                setAutoHigh(Math.max(parseInt(e.target.value), 0))
              }
            />
          </div>
        </div>

        <div className="data-group">
          <h5>Telop</h5>
          <div className="form-group">
            <label htmlFor="lowball-telop">balls in low: </label>
            <input
              className="form-inputs"
              type="number"
              placeholder="0"
              id="lowball-telop"
              value={telopLow}
              onChange={(e) =>
                setTelopLow(Math.max(parseInt(e.target.value), 0))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="highball-telop">balls in high: </label>
            <input
              className="form-inputs"
              type="number"
              placeholder="0"
              id="highball-telop"
              value={telopHigh}
              onChange={(e) =>
                setTelopHigh(Math.max(parseInt(e.target.value), 0))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="climb-telop">level of climb: </label>
            <input
              className="form-inputs"
              type="number"
              placeholder="(0-4)"
              id="climb-telop"
              value={climb}
              onChange={(e) =>
                setClimb(Math.min(4, Math.max(parseInt(e.target.value), 0)))
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
}
