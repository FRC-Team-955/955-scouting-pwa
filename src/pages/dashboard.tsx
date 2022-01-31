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
import { getMatchDataFirebase } from "../api/firebase-api";

export default function Dashboard() {
  const [eventList, setEventList] = useState<Array<IEvent> | null>();
  const [matchSchedule, setMatchSchedule] = useState<IMatchSchedule>([]);
  const [week, setWeek] = useState(1);
  const [eventKey, setEventKey] = useState("");
  const [showCsvViewer, setShowCsvViewer] = useState(false);
  const [showQRgen, setShowQRgen] = useState(false);
  const [QRdata, setQRdata] = useState({});
  const [lockDropdown, setLockDropdown] = useState(false);

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
        <select
          value={week}
          id="week-select"
          onChange={handleChange}
          disabled={lockDropdown}
        >
          <option value={1}>Week 1</option>
          <option value={2}>Week 2</option>
          <option value={3}>Week 3</option>
          <option value={4}>Week 4</option>
          <option value={5}>Week 5</option>
          <option value={6}>Week 6</option>
        </select>

        {lockDropdown ? (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="lock"
            className="svg-inline--fa fa-lock"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height="1.599rem"
            onClick={() => setLockDropdown(false)}
            style={{ display: "inline", float: "right", marginLeft: "1rem" }}
          >
            <path
              fill="currentColor"
              d="M384 223.1L368 224V144c0-79.41-64.59-144-144-144S80 64.59 80 144V224L64 223.1c-35.35 0-64 28.65-64 64v160c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64v-160C448 252.7 419.3 223.1 384 223.1zM144 144C144 99.88 179.9 64 224 64s80 35.88 80 80V224h-160V144z"
            ></path>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="lock-open"
            className="svg-inline--fa fa-lock-open"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            height="1.599rem"
            onClick={() => setLockDropdown(true)}
            style={{ display: "inline", float: "right", marginLeft: "1rem" }}
          >
            <path
              fill="currentColor"
              d="M446.4 .7031C360.5-7.664 288 59.85 288 144V224H64C28.65 224 0 252.7 0 288v160c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V288c0-35.35-28.65-64-64-64h-32V144c0-46.89 40.52-84.46 88.37-79.57C481.1 68.68 512 106.9 512 148.7V208C512 216.8 519.2 224 528 224h32C568.8 224 576 216.8 576 208V150.4C576 75.24 521.2 7.992 446.4 .7031z"
            ></path>
          </svg>
        )}

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
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="arrows-rotate"
          className="svg-inline--fa fa-arrows-rotate"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="1.599rem"
          onClick={getMatchDataFirebase}
          style={{ display: "inline", float: "right", marginRight: "1rem" }}
        >
          <path
            fill="currentColor"
            d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"
          ></path>
        </svg>
      </div>
      <select
        value={eventKey}
        name="Event"
        id="event-select"
        onChange={matchChange}
        disabled={lockDropdown}
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
