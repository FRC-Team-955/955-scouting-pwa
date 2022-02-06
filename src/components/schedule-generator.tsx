import { useState, useEffect } from "react";
import { storeMatchSchedule } from "../api/local-storage";
import "../styles/schedule-generator.css";
import MatchGenerator from "./match-generator";

export default function ScheduleGenerator({ exit }) {
  const [name, setName] = useState("");
  const [week, setWeek] = useState(0);
  const [matches, setMatches] = useState<any>([]);
  const [id, setId] = useState("");

  function saveMatch() {
    storeMatchSchedule(week, {
      id,
      name,
      week,
      matches,
    });
  }

  return (
    <div className="card" id="sg-div">
      <svg
        id="main-svg"
        onClick={() => {
          saveMatch();
          exit();
        }}
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
        ></path>
      </svg>
      <form>
        <div className="form-group">
          <label htmlFor="event-week">Event Week</label>
          <input
            type="number"
            className="form-control"
            id="event-week"
            placeholder="1-8"
            value={week}
            onChange={(e) => setWeek(parseInt(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-name">Event Name</label>
          <input
            type="text"
            className="form-control"
            id="event-name"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setId("2022" + e.target.value.replace(/\s/g, ""));
            }}
          />
        </div>
      </form>
      <hr />
      <div>
        {matches.map((e, i) => (
          <MatchGenerator
            key={i}
            data={e}
            setData={(d) =>
              setMatches([...matches.slice(0, i), d, ...matches.slice(i + 1)])
            }
            id={id}
            remove={() =>
              setMatches([...matches.slice(0, i), ...matches.slice(i + 1)])
            }
          />
        ))}

        <button
          id="add-match"
          disabled={!name}
          className="btn btn-primary"
          onClick={() => setMatches([...matches, {}])}
        >
          +
        </button>
      </div>
    </div>
  );
}
