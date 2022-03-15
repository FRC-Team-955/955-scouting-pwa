import { IMatch } from "../models";
import TeamButton from "./team-button";
import "../styles/match.css";

function Match({ data }: { data: IMatch }) {
  return (
    <div
      className="card"
      style={{
        width: "20.5rem",
        height: "8.6875rem",
        margin: "1rem auto",
      }}
    >
      <div className="card-body">
        <h3 id="match-number">Qualifier {data.matchNumber}</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          {data.alliances.red.map((e, i) => (
            <TeamButton
              key={e}
              matchId={data.id}
              number={e}
              i={i}
              color="red"
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {data.alliances.blue.map((e, i) => (
            <TeamButton
              key={e}
              matchId={data.id}
              number={e}
              i={i + 3}
              color="blue"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Match;
