import { useContext, useState, useEffect } from "react";
import { HasData } from "../context";
import "../styles/qrgen.css";
import QRCode from "qrcode";
import { loadMatchData } from "../api/local-storage";
import { ITeamData } from "../models";

function QRGen({
  exit,
  hasDataIndex,
  teamNumber,
  matchId,
}: {
  exit: any;
  hasDataIndex: number;
  teamNumber: number;
  matchId: string;
}) {
  const { hasData } = useContext(HasData);
  const [qr, setQr] = useState("");
  async function generateQR(text) {
    try {
      setQr(await QRCode.toDataURL(text)); // generates qr image and returns url of image
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    loadMatchData(`${matchId}-${teamNumber.toString()}*${hasDataIndex}`).then(
      (data: ITeamData) =>
        generateQR(
          // converts from data object to string
          `${data.id},${data.teamNumber},${data.taxi},${data.autoLow},${data.autoHigh},${data.telopLow},${data.telopHigh},${data.defense},${data.climb}, ${data.notes}`
        )
    );
  }, [hasDataIndex, matchId, teamNumber]);

  return (
    <div className="qrcard card" style={{ width: "16rem", height: "20rem" }}>
      <div className="card-body">
        <svg onClick={exit} viewBox="0 0 320 512">
          <path
            fill="currentColor"
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
          ></path>
        </svg>
        {hasData[hasDataIndex] ? <h4>Team: {teamNumber}</h4> : <p>No Data</p>}
        <img src={qr} alt=""></img>
      </div>
    </div>
  );
}

export default QRGen;
