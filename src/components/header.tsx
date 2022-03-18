import { useState, useEffect, useContext } from "react";
import { getLocalEventsFromWeek, storeEvent } from "../api/local-storage";
import { getEventFromKey, getEventsFromWeek } from "../api/tba";
import { SelectedWeek, SelectedEvent } from "../context";
import { IEvent } from "../models";
import "../styles/header.css";
import ButtonBar from "./button-bar";

function Header() {
  let { week, setWeek } = useContext(SelectedWeek);
  let { selectedEvent, setSelectedEvent } = useContext(SelectedEvent);
  const [eventList, setEventList] = useState([]);
  const [eventKey, setEventKey] = useState(selectedEvent?.id || "");

  useEffect(() => {
    if (navigator.onLine) {
      getEventsFromWeek(week).then((res) => setEventList(res));
    } else {
      getLocalEventsFromWeek(week).then((res) => {
        setEventList(res);
        console.log(res);
      });
    }
  }, [week]);

  useEffect(() => {
    if (navigator.onLine) {
      getEventFromKey(eventKey).then((res) => {
        setSelectedEvent(res);
        storeEvent(res);
      });
    } else {
      console.log("test");
      if (eventList.find((x: IEvent) => x.id === eventKey) !== undefined) {
        setSelectedEvent(eventList.find((x: IEvent) => x.id === eventKey));
      }
    }
  }, [eventKey, eventList, setSelectedEvent]);

  return (
    <div>
      <div
        style={{
          margin: "0 1rem",
          marginTop: "1.5rem",
        }}
      >
        <select
          value={week}
          id="week-select"
          onChange={(e) => {
            setWeek(parseInt(e.target.value));
          }}
        >
          <option value={1}>Week 1</option>
          <option value={2}>Week 2</option>
          <option value={3}>Week 3</option>
          <option value={4}>Week 4</option>
          <option value={5}>Week 5</option>
          <option value={6}>Week 6</option>
        </select>
        <ButtonBar eventKey={eventKey} />
      </div>
      <select
        value={selectedEvent.id}
        name="Event"
        id="event-select"
        onChange={(m) => setEventKey(m.target.value)}
      >
        {eventList ? (
          eventList.map((e: any, i) => (
            <option value={e.id} key={i}>
              {e.name}
            </option>
          ))
        ) : (
          <></>
        )}
      </select>
      <hr />
    </div>
  );
}

export default Header;
