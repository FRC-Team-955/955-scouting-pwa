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
      <div
        style={{
          margin: "0 1rem",
          marginTop: "1.5rem",
        }}
      >
        <select value={week} id="week-select" onChange={handleChange}>
          <option value={1}>Week 1</option>
          <option value={2}>Week 2</option>
          <option value={3}>Week 3</option>
          <option value={4}>Week 4</option>
          <option value={5}>Week 5</option>
          <option value={6}>Week 6</option>
        </select>

        {showCsvViewer ? (
          <CsvViewer exit={() => setShowCsvViewer(false)} eventId={eventKey} />
        ) : (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="cloud-arrow-down"
            className="svg-inline--fa fa-cloud-arrow-down"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            width="2rem"
            onClick={() => setShowCsvViewer(true)}
            style={{ display: "inline", float: "right" }}
          >
            <path
              fill="currentColor"
              d="M537.6 226.6C541.7 215.9 544 204.2 544 192c0-53-43-96-96-96c-19.69 0-38.09 6-53.31 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.703 .1094 5.445 .2031 8.133C40.2 219.8 0 273.2 0 336C0 415.5 64.5 480 144 480H512c70.69 0 128-57.3 128-128C640 290.1 596 238.4 537.6 226.6zM424.1 320.1l-88 88C334.4 411.5 328.5 416 320 416s-14.4-4.467-16.97-7.031l-88-88c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L296 334.1V184C296 170.8 306.8 160 320 160s24 10.75 24 24v150.1l47.03-47.03c9.375-9.375 24.56-9.375 33.94 0S434.3 311.6 424.1 320.1z"
            ></path>
          </svg>
        )}
      </div>
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
