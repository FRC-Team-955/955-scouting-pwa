import { useEffect, useState } from "react";

import "../styles/dashboard.css";

import Nav from "../components/nav";
import Match from "../components/match";
import CsvViewer from "../components/csv-viewer";
import QRgen from "../components/qrgen";
import DataEntry from "../components/data-entry";

import {
  getEventFromKey,
  getEventsFromWeek,
  getMatchesFromEventKey,
} from "../api/tba";

import { storeMatchSchedule, loadMatchSchedules } from "../api/local-storage";
import { IEvent, IMatchSchedule } from "../models";

export default function Dashboard() {
  const [eventList, setEventList] = useState<Array<IEvent> | null>();
  const [matchSchedule, setMatchSchedule] = useState<IMatchSchedule>([]);
  const [week, setWeek] = useState(1);
  const [eventKey, setEventKey] = useState("");
  const [showCsvViewer, setShowCsvViewer] = useState(false);
  const [showQRgen, setShowQRgen] = useState(false);
  const [QRdata, setQRdata] = useState({});

  const handleChange = (e) => {
    setWeek(e.target.value);
  };
  useEffect(() => {
    if (navigator.onLine) {
      // runs while online
      getEventsFromWeek(week).then((s) => {
        setEventList(s);
        setEventKey(s[0].id);
      });
    } else {
      // runs while offline
      loadMatchSchedules(week).then((s) => {
        setEventList(s);
        setEventKey(s[0].id);
      });
    }
  }, [week]);

  useEffect(() => {
    // runs while online
    if (navigator.onLine) {
      getMatchesFromEventKey(eventKey).then((s) => {
        setMatchSchedule(s);
        getEventFromKey(eventKey).then((res) => storeMatchSchedule(week, res)); // stores selected match
      });
    } else {
      // runs while offline
      const s: any = eventList
        ? eventList.find((x) => x.id === eventKey)?.matches
        : [];
      if (s.length > 0) setMatchSchedule(s);
    }
    // eslint-disable-next-line
  }, [eventKey]);

  const matchChange = (m) => {
    setEventKey(m.target.value);
  };

  return (
    <div>

      {showQRgen ? (
        <QRgen exit={() => setShowQRgen(false)} data={QRdata} />
      ) : (
        <></>
      )}

      <select value={week} id="week-select" onChange={handleChange}>
        <option value={1}>Week 1</option>
        <option value={2}>Week 2</option>
        <option value={3}>Week 3</option>
        <option value={4}>Week 4</option>
        <option value={5}>Week 5</option>
        <option value={6}>Week 6</option>
      </select>

      <select
        value={eventKey}
        name="Event"
        id="event-select"
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
            <Match
              key={index}
              matchData={data}
              openQRgen={(QRinfo) => {
                setShowQRgen(true);
                setQRdata(QRinfo);
              }}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <Nav selectedPage={1} />
    </div>
  );
}
