import { useState, useEffect } from "react";
import "../styles/schedule-generator.css";

export default function MatchGenerator({ data, setData, remove, id }) {
  const [number, setNumber] = useState<string>();
  const [type, setType] = useState("qm");
  const [teamNumber, setTeamNumber] = useState(["", "", "", "", "", ""]);
  useEffect(() => {
    setData({
      id: `${id}_${type}${number}`,
      matchType: type,
      matchNumber: number,
      isVerified: false,
      isAllDataEntered: false,
      isDataUploaded: false,
      alliances: {
        red: {
          teams: teamNumber.slice(3, 6),
          data: [],
        },
        blue: {
          teams: teamNumber.slice(0, 3),
          data: [],
        },
      },
    });
    // eslint-disable-next-line
  }, [teamNumber, type, number, id]);
  return (
    <div className="match-generator">
      <svg id="match-svg" onClick={remove} viewBox="0 0 320 512">
        <path
          fill="currentColor"
          d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
        ></path>
      </svg>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="qm">Qualifier</option>
        <option value="qf">Quarterfinal</option>
        <option value="sf">Semifinal</option>
        <option value="f">Final</option>
      </select>
      <input
        id="match-number-inp"
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="match #"
      />
      <div>
        <input
          id="team-num-b0"
          className="blue-input"
          type="number"
          value={teamNumber[0]}
          onChange={(e) =>
            setTeamNumber([e.target.value, ...teamNumber.slice(1)])
          }
          placeholder="Blue #1"
        />
        <input
          id="team-num-b1"
          className="blue-input"
          type="number"
          value={teamNumber[1]}
          onChange={(e) =>
            setTeamNumber([
              ...teamNumber.slice(0, 1),
              e.target.value,
              ...teamNumber.slice(2),
            ])
          }
          placeholder="Blue #2"
        />
        <input
          id="team-num-b2"
          className="blue-input"
          type="number"
          value={teamNumber[2]}
          onChange={(e) =>
            setTeamNumber([
              ...teamNumber.slice(0, 2),
              e.target.value,
              ...teamNumber.slice(3),
            ])
          }
          placeholder="Blue #3"
        />
      </div>
      <div>
        <input
          id="team-num-r0"
          className="red-input"
          type="number"
          value={teamNumber[3]}
          onChange={(e) =>
            setTeamNumber([
              ...teamNumber.slice(0, 3),
              e.target.value,
              ...teamNumber.slice(4),
            ])
          }
          placeholder="Red #1"
        />
        <input
          id="team-num-r1"
          className="red-input"
          type="number"
          value={teamNumber[4]}
          onChange={(e) =>
            setTeamNumber([
              ...teamNumber.slice(0, 4),
              e.target.value,
              ...teamNumber.slice(5),
            ])
          }
          placeholder="Red #2"
        />
        <input
          id="team-num-r2"
          className="red-input"
          type="number"
          value={teamNumber[5]}
          onChange={(e) =>
            setTeamNumber([...teamNumber.slice(0, 5), e.target.value])
          }
          placeholder="Red #3"
        />
      </div>
    </div>
  );
}
