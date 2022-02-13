import Nav from "../components/nav";
import React, { useState, useEffect } from "react";
import { getEventFromWeekAndId } from "../api/local-storage";
import { IEvent } from "../models";
import MatchAnalysis from "../components/match-analysis";

export function Settings({ week, id }) {
  const [event, setEvent] = useState<IEvent | null>();
  useEffect(() => {
    getEventFromWeekAndId(week, id).then((res) => {
      setEvent(res);
    });
  }, []);

  return (
    <div>
      <h2 style={{ margin: "2rem 0 0 1rem " }}>Data Analysis</h2>
      {event?.matches.map((e, i) => (
        <MatchAnalysis matchData={e} key={i} />
      ))}
      <Nav selectedPage={2} />
    </div>
  );
}
