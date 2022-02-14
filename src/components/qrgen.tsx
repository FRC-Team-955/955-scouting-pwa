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
          {data?.teamNumber ? data.teamNumber : <p>No Data</p>}
          <button className="btn btn-primary" id="exit-btn" onClick={exit}>
            Exit
          </button>
          <img src={qr} width="200px" height="200px" alt=""></img>
        </Card.Body>
      </Card>
    </div>
  );
}
