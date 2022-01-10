import { useEffect, useState } from "react";

import "../styles/dashboard.css";

import Nav from "../components/nav";
import Match from "../components/match";
import CsvViewer from "../components/csv-viewer";

import { getEventsFromWeek, getMatchesFromEventKey } from "../api/tba";
import { ICurrentEvent, IMatch } from "../models";

export default function Dashboard() {
  const [eventList, setEventList] = useState<Array<ICurrentEvent> | null>();
  const [matchSchedule, setMatchSchedule] = useState<Array<IMatch>>([]);
  const [week, setWeek] = useState(1);
  const [eventKey, setEventKey] = useState("");
  const [showCsvViewer, setShowCsvViewer] = useState(false);

  const handleChange = (e) => {
    setWeek(e.target.value);
  };

  useEffect(() => {
    getEventsFromWeek(week).then((s) => {
      setEventList(s);
      setEventKey(s[0].id);
    });
  }, [week]);

  useEffect(() => {
    getMatchesFromEventKey(eventKey).then((s) => {
      setMatchSchedule(s);
    });
  }, [eventKey]);

  const matchChange = (m) => {
    setEventKey(m.target.value);
  };

  return (
    <div>
      <div className="weeklist">
        <select value={week} id="week-event" onChange={handleChange}>
          <option value={1}>Week 1</option>
          <option value={2}>Week 2</option>
          <option value={3}>Week 3</option>
          <option value={4}>Week 4</option>
          <option value={5}>Week 5</option>
          <option value={6}>Week 6</option>
        </select>
      </div>

      <div className="eventlist">
        <select
          value={eventKey}
          name="Event"
          id="event-name"
          onChange={matchChange}
        >
          {eventList ? (
            eventList.map((e, i) => (
              <option value={e.id} key={i}>
                {e.name}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
      </div>

      <hr />

      {showCsvViewer ? (
        <CsvViewer exit={() => setShowCsvViewer(false)} />
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => setShowCsvViewer(true)}
        >
          Download CSV
        </button>
      )}

      <div className="matches">
        <p>Matches</p>
      </div>

      <div>
        {matchSchedule.length > 0 ? (
          matchSchedule.map((data, index) => (
            <Match key={index} matchData={data} />
          ))
        ) : (
          <></>
        )}
      </div>
      <Nav />
    </div>
  );
}
