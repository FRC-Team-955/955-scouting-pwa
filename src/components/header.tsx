import { useState, useEffect, useContext } from "react";

import { getLocalEventsFromWeek, storeEvent } from "../api/local-storage";
import { getEventFromKey, getEventsFromWeek } from "../api/tba";
import { SelectedWeek, SelectedEvent } from "../context";
import "../styles/header.css";

import ButtonBar from "./button-bar";

import { IEvent } from "../models";

function Header() {
  const { week, setWeek } = useContext(SelectedWeek); // global state of selected week
  const { selectedEvent, setSelectedEvent } = useContext(SelectedEvent); // global state of selected match
  const [eventList, setEventList] = useState([]); // list of events in selected week, used to generate 2nd select
  const [eventKey, setEventKey] = useState(selectedEvent?.id || ""); // id/key of the event in 2nd select

  // Use effect is a react hook that runs after the page is rendered. It's usually used for API calls or code with side effects.
  useEffect(() => {
    if (navigator.onLine) {
      // if connected to internet
      getEventsFromWeek(week).then((res) => {
        // get a list events from TBA for a given week
        setEventList(res);
        setEventKey(selectedEvent?.id || res[0].id);
      });
    } else {
      // if offline
      getLocalEventsFromWeek(week).then((res) => {
        // load the list of locally stored event
        setEventList(res);
        setEventKey(selectedEvent?.id || res[0].id);
      });
    }
  }, [week]); // This is a dependency array. This function will rerun once the value of week changes. If there is no array, function will run on every rerender.

  useEffect(() => {
    if (navigator.onLine) {
      // if connected to internet
      //TODO: change this to pull from event list (see below)
      getEventFromKey(eventKey).then((res) => {
        // the select only remembers the event key so we need to reload to get the rest of the event data
        setSelectedEvent(res);
        storeEvent(res); // store the event locally
      });
    } else {
      // if offline
      if (eventList.find((x: IEvent) => x.id === eventKey) !== undefined) {
        // if selected event key is in eventList
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
        {/* Week select */}
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
        {/* button to download data */}
        <ButtonBar eventKey={eventKey} />
      </div>
      {/* Match select */}
      <select
        value={selectedEvent.id}
        name="Event"
        id="event-select"
        onChange={(m) => setEventKey(m.target.value)}
      >
        {/* creates an option for every index in eventList */}
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
