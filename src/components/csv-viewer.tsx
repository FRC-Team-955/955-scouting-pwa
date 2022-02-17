import { useState, useEffect } from "react";
import { generateCSV, generateScheduleCSV } from "../api/local-storage";

import "../styles/csv-viewer.css";

export default function CsvViewer({ exit, eventId, week }) {
  const [csvText, setCsvText] = useState("");
  const [csvScheduleText, setScheduleCsvText] = useState("");
  const [show, setShow] = useState(false);
  const [showS, setShowS] = useState(false);
  useEffect(() => {
    generateCSV(eventId).then((data) => setCsvText(data)); // gets data from local storage
    generateScheduleCSV(eventId, week).then((data) => setScheduleCsvText(data)); // gets data from local storage
  }, []);

  function downloadFile(): any {
    //generates and downloads a csv file from csvText
    const element = document.createElement("a");
    const file = new Blob([csvText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "matchData.csv";
    document.body.appendChild(element);
    element.click();
  }

  function downloadScheduleFile(): any {
    //generates and downloads a csv file from csvText
    const element = document.createElement("a");
    const file = new Blob([csvScheduleText], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "schedule.csv";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className="card" id="csv-viewer-div" style={{ width: "18rem" }}>
      <div className="card-body">
        Event ID: {eventId}
        <svg onClick={exit} viewBox="0 0 320 512">
          <path
            fill="currentColor"
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
          ></path>
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            onClick={downloadFile}
            className="btn btn-primary"
            id="csvDownload"
          >
            Download Data
          </button>
          <button className="btn btn-primary" onClick={() => setShow(!show)}>
            Show/Hide Data
          </button>
          {show ? <textarea rows={15} value={csvText} readOnly /> : <></>}
          <button
            onClick={downloadScheduleFile}
            className="btn btn-primary"
            id="Schedule Download"
          >
            Download Schedule
          </button>
          <button className="btn btn-primary" onClick={() => setShowS(!showS)}>
            Show/Hide Schedule
          </button>
          {showS ? (
            <textarea rows={15} value={csvScheduleText} readOnly />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
