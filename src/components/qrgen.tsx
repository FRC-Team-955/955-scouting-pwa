import "../styles/qrgen.css";
import QRCode from "qrcode";

import { useState, useEffect } from "react";

import { Card } from "react-bootstrap";

export default function QRgen({ exit, data }) {
  const [qr, setQr] = useState("");
  async function generateQR(text) {
    try {
      setQr(await QRCode.toDataURL(text));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    generateQR(`${data}`);
  }, [data]);

  return (
    <div className="qrcard">
      <Card style={{ width: "16rem", height: "20rem" }}>
        <Card.Body>
          {data}
          <button className="btn btn-primary" id="exit-btn" onClick={exit}>
            Exit
          </button>
          <img src={qr} width="200px" height="200px" alt=""></img>
        </Card.Body>
      </Card>
    </div>
  );
}
