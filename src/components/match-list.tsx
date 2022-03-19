import { useState, useEffect, useContext } from "react";
import { getMatchesFromEventKey } from "../api/tba";
import { HasData, SelectedEvent } from "../context";
import { IMatch } from "../models";
import Match from "./match";
import "../styles/match-list.css";
import {
  getLocalMatchesFromEventKey,
  loadHasData,
  storeMatches,
} from "../api/local-storage";

function MatchList() {
  const [matches, setMatches] = useState([]);
  const { selectedEvent } = useContext(SelectedEvent);
  const { setHasData } = useContext(HasData);

  useEffect(() => {
    if (navigator.onLine) {
      getMatchesFromEventKey(selectedEvent.id).then((res) => {
        setMatches(res);
        storeMatches(res, selectedEvent.id);
        loadHasData(selectedEvent.id).then((arr) => {
          let newHasData = new Array(res.length).fill(false);
          arr.forEach((e) => (newHasData[e] = true));
          setHasData(newHasData);
        });
      });
    } else {
      getLocalMatchesFromEventKey(selectedEvent.id).then((res) => {
        setMatches(res);
        storeMatches(res, selectedEvent.id);
        loadHasData(selectedEvent.id).then((arr) => {
          let newHasData = new Array(res.length).fill(false);
          arr.forEach((e) => (newHasData[e] = true));
          setHasData(newHasData);
        });
      });
    }
  }, [selectedEvent, setHasData]);

  return (
    <div style={{ marginBottom: "5rem" }}>
      <div className="matches">
        <p>Matches</p>
      </div>
      <div>
        {matches.map((e: IMatch, i) => {
          if (e.matchType === "qm") {
            return <Match data={e} key={i} />;
          }
          return <></>;
        })}
      </div>
    </div>
  );
}

export default MatchList;
