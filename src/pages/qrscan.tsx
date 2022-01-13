import { useState } from "react";
import "../styles/qrscan.css";

import Nav from "../components/nav";
import QrReader from "react-qr-scanner";

export function QRScan() {
  const [displayScanner, setDisplayScanner] = useState(false);
  return (
    <div id="qr-div">
      <h2 id="qr-title">
        Scan a QR Code to import match data from another device
      </h2>
      {displayScanner ? (
        <QrReader
          id="qr-reader"
          delay={100}
          onError={(e) => {
            console.log(e);
          }}
          legacyMode={true}
        />
      ) : (
        <div id="qr-nocamera" onClick={() => setDisplayScanner(true)}>
          Click to start camera
        </div>
      )}

      <Nav selectedPage={0} />
    </div>
  );
}
