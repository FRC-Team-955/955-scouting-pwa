import { useState, useEffect } from "react";
import "../styles/qrscan.css";

import Nav from "../components/nav";
import { Html5QrcodeScanner } from "html5-qrcode"; //https://www.npmjs.com/package/html5-qrcode
import { storeMatchData } from "../api/local-storage";

export function QRScan() {
  let html5QrcodeScanner;

  useEffect(() => {
    html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  }, []);

  function onScanSuccess(decodedText, decodedResult) {
    const dataArr = decodedText.split(",");
    console.log(dataArr);
    if (dataArr.length >= 8) {
      console.log("hi");
      storeMatchData({
        id: dataArr[0],
        teamNumber: parseInt(dataArr[1]),
        taxi: dataArr[2] === "true",
        autoLow: parseInt(dataArr[3]),
        autoHigh: parseInt(dataArr[4]),
        telopLow: parseInt(dataArr[5]),
        telopHigh: parseInt(dataArr[6]),
        climb: parseInt(dataArr[7]),
      });
    }
  }

  function onScanFailure(error) {
    // lets just ingnore these :P
  }

  return (
    <div id="qr-div">
      <h2 id="qr-title">
        Scan a QR Code to import match data from another device
      </h2>
      {/* {displayScanner ? (
        <div id="reader" style={{ width: "600px" }}></div>
      ) : (
        <div id="qr-nocamera" onClick={() => setDisplayScanner(true)}>
          Click to start camera
        </div>
      )} */}
      <div id="qr-reader"></div>
      <Nav selectedPage={0} />
    </div>
  );
}
