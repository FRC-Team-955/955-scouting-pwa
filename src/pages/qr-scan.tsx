import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode"; //https://www.npmjs.com/package/html5-qrcode

import "../styles/qrscan.css";
import { storeMatchData } from "../api/local-storage";

import Nav from "../components/nav";


function QRScan() {
  // page allows scanning of QR codes to transfer data between phones
  let html5QrcodeScanner;
  useEffect(() => {
    // DONT TOUCH THIS (it works ;) )
    // initializes qr scanner, documentation: https://www.npmjs.com/package/html5-qrcode
    html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  }, []);

  async function onScanSuccess(decodedText) {
    // function runs after sucesfull scan of qr code
    const dataArr = decodedText.split(","); // data ended in qr is a csv string that is split into an array
    if (dataArr.length >= 8) { // check to make sure we scanned a valid code (this is not very secure, google code injection)
      await storeMatchData({ // send data to local storage
        id: dataArr[0],
        teamNumber: parseInt(dataArr[1]),
        taxi: dataArr[2] === "true",
        autoLow: parseInt(dataArr[3]),
        autoHigh: parseInt(dataArr[4]),
        telopLow: parseInt(dataArr[5]),
        telopHigh: parseInt(dataArr[6]),
        defense: parseInt(dataArr[7]),
        climb: parseInt(dataArr[8]),
        notes: dataArr[9],
      });
    }
  }

  function onScanFailure(error) {
    // function runs after you FAIL
    // let's just ignore these :P
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

export default QRScan;
