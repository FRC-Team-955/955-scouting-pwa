import { useState, useContext } from "react";
import { HasData } from "../context";
import DataEntry from "./data-entry";
import QRGen from "./qr-gen";
import ellipsisImg from "../styles/images/ellipsis-v.png";

function TeamButton({
  matchId,
  number,
  i,
  color,
}: {
  matchId: string;
  number: number;
  i: number;
  color: string;
}) {
  const [showDataEntry, setShowDataEntry] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { hasData } = useContext(HasData);
  const hasDataIndex = (parseInt(matchId.match(/\d+$/)![0]) - 1) * 6 + i;
  function openDataEntry() {
    setShowDataEntry(true);
  }
  return (
    <div>
      {showDataEntry ? (
        <DataEntry
          exit={() => setShowDataEntry(false)}
          hasDataIndex={hasDataIndex}
          teamNumber={number}
          matchId={matchId}
        />
      ) : (
        <></>
      )}
      {showQR ? (
        <QRGen
          exit={() => setShowQR(false)}
          hasDataIndex={hasDataIndex}
          teamNumber={number}
          matchId={matchId}
        />
      ) : (
        <></>
      )}
      <button
        className={color === "blue" ? "bluebutton" : "redbutton"}
        style={{
          display: 'flex',
          justifyContent:'space-between',
          alignItems:'center',
          background:
            hasData[hasDataIndex] && color === "blue"
              ? "rgba(47, 128, 237, 0.1)"
              : hasData[hasDataIndex] && color === "red"
              ? "rgba(235, 87, 87, 0.1)"
              : "none",
        }}
        onClick={() => openDataEntry()}
      >
        {number}
        <img
          className="ellipsis"
          width="30px"
          height="30px"
          alt=""
          src={ellipsisImg}
          onClick={(e) => {
            e.stopPropagation();
            setShowQR(true);
          }}
        />
      </button>
    </div>
  );
}

export default TeamButton;
