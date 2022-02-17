// a component that displaces a QR code when 3 dots are clicked on
import "../styles/qrgen.css";
import QRCode from "qrcode";

import { useState, useEffect } from "react";

import { Card } from "react-bootstrap";

export default function QRgen({ exit, data }) {
  const [qr, setQr] = useState(""); // string to display in QR
  async function generateQR(text) {
    try {
      setQr(await QRCode.toDataURL(text)); // generates qr image and returns url of image
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (data?.teamNumber)
      generateQR(
        // converts from data object to string
        `${data.id},${data.teamNumber},${data.taxi},${data.autoLow},${data.autoHigh},${data.telopLow},${data.telopHigh},${data.defense},${data.climb}, ${data.notes}`
      );
  }, [data]);

  return (
    <div className="qrcard">
      <Card style={{ width: "16rem", height: "20rem" }}>
        <Card.Body>
          <svg onClick={exit} viewBox="0 0 320 512">
            <path
              fill="currentColor"
              d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
            ></path>
          </svg>
          {data?.teamNumber ? <h4>Team: {data.teamNumber}</h4> : <p>No Data</p>}
          <img src={qr} alt=""></img>
        </Card.Body>
      </Card>
    </div>
  );
}
