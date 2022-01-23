import { useState } from "react";
import "../styles/qrscan.css";

import Nav from "../components/nav";
import QrReader from "react-qr-scanner";
import { storeMatchData } from "../api/local-storage";

export function QRScan() {
  const [displayScanner, setDisplayScanner] = useState(false);

  function handleScan(data){
    if(data){
      const dataArr = data.text.split(',')
      setDisplayScanner(false)
      if(dataArr.length >= 8){
        storeMatchData({
          id: dataArr[0],
          teamNumber: parseInt(dataArr[1]),
          taxi: (dataArr[2] === 'true'),
          autoLow: parseInt(dataArr[3]),
          autoHigh: parseInt(dataArr[4]),
          telopLow: parseInt(dataArr[5]),
          telopHigh: parseInt(dataArr[6]),
          climb: parseInt(dataArr[7])
        })
      }
    }
  }

  return (
    <div id="qr-div">
      <h2 id="qr-title">
        Scan a QR Code to import match data from another device
      </h2>
      {displayScanner ? (
        <QrReader
          id="qr-reader"
          delay={500}
          onError={(e) => {
            console.log(e);
          }}
          legacyMode={true}
          onScan={handleScan}
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
