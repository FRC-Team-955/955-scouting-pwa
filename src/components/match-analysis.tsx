import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getAvgDataFromTeamList } from "../api/local-storage";
import TeamAnalysis from "./team-analysis";

export default function MatchAnalysis({ matchData }) {
  const [avgData, setAvgData] = useState<any>([]);
  const [totalScore, setTotalScore] = useState([0, 0]);
  const [showDataView, setShowDataView] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>({});
  useEffect(() => {
    getAvgDataFromTeamList([
      ...matchData.alliances.blue.teams,
      ...matchData.alliances.red.teams,
    ]).then((res) => {
      setAvgData(res);
      setTotalScore([
        Math.floor(res.reduce(findTotalScoreBlue, 0)),
        Math.floor(res.reduce(findTotalScoreRed, 0)),
      ]);
    });
  }, []);

  function findTotalScoreBlue(sum: number, e: any) {
    if (matchData.alliances.blue.teams.includes(e.teamNumber)) {
      return (
        sum +
        e.taxi * 2 +
        e.autoLow * 2 +
        e.autoHigh * 4 +
        e.telopLow +
        e.telopHigh * 2 +
        Math.round(0.285714 * e.climb * e.climb + 2.45714 * e.climb + 0.371429)
      );
    }
    return sum;
  }
  function findTotalScoreRed(sum: number, e: any) {
    if (matchData.alliances.red.teams.includes(e.teamNumber)) {
      return (
        sum +
        e.taxi * 2 +
        e.autoLow * 2 +
        e.autoHigh * 4 +
        e.telopLow +
        e.telopHigh * 2 +
        (0.285714 * e.climb * e.climb + 2.45714 * e.climb + 0.371429)
      );
    }
    return sum;
  }

  function showData(team) {
    setShowDataView(true);
    if (avgData.length > 0) {
      setSelectedTeam(avgData.find((x) => x.teamNumber === team));
    } else {
      setSelectedTeam({
        teamNumber: team,
        taxi: 0,
        autoLow: 0,
        autoHigh: 0,
        telopLow: 0,
        telopHigh: 0,
        climb: 0,
      });
    }
  }

  return (
    <Card
      style={{ width: "20.5rem", height: "8.6875rem", margin: "1rem auto" }}
    >
      <Card.Body>
        {showDataView ? (
          <TeamAnalysis
            data={selectedTeam}
            exit={() => setShowDataView(false)}
          />
        ) : (
          <></>
        )}
        <div id="match-number">
          <p>
            {matchData.matchType === "qm"
              ? "Qualifier "
              : matchData.matchType === "f"
              ? "Final "
              : matchData.matchType === "qf"
              ? "Quarterfinal " + matchData.id[matchData.id.length - 3] + "-"
              : matchData.matchType === "sf"
              ? "Semifinal " + matchData.id[matchData.id.length - 3] + "-"
              : ""}
            {matchData.matchNumber} - Avg Points: B: {totalScore[0]}, R:{" "}
            {totalScore[1]}
          </p>
        </div>
        <div>
          <button
            className="bluebutton"
            onClick={() => showData(matchData.alliances.blue.teams[0])}
          >
            {matchData.alliances.blue.teams[0]}
          </button>
          <button
            className="bluebutton"
            onClick={() => showData(matchData.alliances.blue.teams[1])}
          >
            {matchData.alliances.blue.teams[1]}
          </button>
          <button
            className="bluebutton"
            onClick={() => showData(matchData.alliances.blue.teams[2])}
          >
            {matchData.alliances.blue.teams[2]}
          </button>
        </div>
        <div>
          <button
            className="redbutton"
            onClick={() => showData(matchData.alliances.red.teams[0])}
          >
            {matchData.alliances.red.teams[0]}
          </button>
          <button
            className="redbutton"
            onClick={() => showData(matchData.alliances.red.teams[1])}
          >
            {matchData.alliances.red.teams[1]}
          </button>
          <button
            className="redbutton"
            onClick={() => showData(matchData.alliances.red.teams[2])}
          >
            {matchData.alliances.red.teams[2]}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
