import { useEffect } from "react";
import "../styles/qrscan.css";

import Nav from "../components/nav";
import { Html5QrcodeScanner } from "html5-qrcode"; //https://www.npmjs.com/package/html5-qrcode
import { storeMatchData } from "../api/local-storage";
import { sendMatchDataFirebase } from "../api/firebase-api";

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

  async function onScanSuccess(decodedText) {
    // function runs after sucesfull scan of qr code
    const dataArr = decodedText.split(","); // qr gives a comma seperated string that is split into an array
    if (dataArr.length >= 8) {
      await storeMatchData({
        id: dataArr[0],
        teamNumber: parseInt(dataArr[1]),
        taxi: dataArr[2] === "true",
        autoLow: parseInt(dataArr[3]),
        autoHigh: parseInt(dataArr[4]),
        telopLow: parseInt(dataArr[5]),
        telopHigh: parseInt(dataArr[6]),
        climb: parseInt(dataArr[7]),
      });
      await sendMatchDataFirebase({
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
    // function runs after you FAIL
    // let's just ingnore these :P
  }

  return (
    <div id="qr-div">
      <h2 id="qr-title">
        Scan a QR Code to import match data from another device
      </h2>
      <div id="qr-reader"></div>
      <Nav selectedPage={0} />
    </div>
  );
}
