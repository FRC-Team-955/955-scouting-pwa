import { useState, useEffect } from "react";
import { generateCSV } from "../api/local-storage";

import "../styles/csv-viewer.css";

export default function CsvViewer({ exit, eventId }) {
  const [csvText, setCsvText] = useState("");
  useEffect(() => {
    generateCSV(eventId).then((data) => setCsvText(data)); // gets data from local storage
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

  return (
    <div className="card" id="csv-viewer-div" style={{ width: "18rem" }}>
      <div className="card-body">
        <button
          onClick={downloadFile}
          className="btn btn-primary"
          id="csvDownload"
        >
          Download
        </button>
        <button className="btn btn-primary" id="csv-viewer-exit-btn" onClick={exit}>
          Exit
        </button>
        <pre>{csvText}</pre>
      </div>
    </div>
  );
}
