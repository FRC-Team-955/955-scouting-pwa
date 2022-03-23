import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SelectedWeek, SelectedEvent, HasData } from "./context";
import "./styles/App.css";

import Dashboard from "./pages/dashboard";
import QRScan from "./pages/qr-scan";
import Offline from "./pages/offline";

import { IEvent } from "./models";

function App() {
  //these states are passed into contexts (aka global state)
  const [week, setWeek] = useState(4); // week currently selected in dropdown
  const [selectedEvent, setSelectedEvent] = useState<IEvent | object>({
    id: "2022orsal",
  }); // event selected in dropdown
  const [hasData, setHasData] = useState([]); // the has data array is a boolean list that says whether we have data stored for a specific team, this stops us from loading all data into ram

  return (
    <SelectedWeek.Provider value={useMemo(() => ({ week, setWeek }), [week])}>
      {/*The providers below/above distribute the state to all other components*/}
      {/* Memoization improves performance by caching the results of function calls so that we can return that result without running the function */}
      <SelectedEvent.Provider
        value={useMemo(
          () => ({ selectedEvent, setSelectedEvent }),
          [selectedEvent]
        )}
      >
        <HasData.Provider
          value={useMemo(() => ({ hasData, setHasData }), [hasData])}
        >
          <BrowserRouter>
            {/* We use client side rendering/routing. This means that when someone makes a GET request to our URL we send them a js file called the bundle */}
            {/* The browser runs the bundle and it generates HTML. Normally when we go to a new page, the browser would send another GET request, but react-router
          allows us pretend like we visited a new page (url change, and back button works) without sending a GET request (using js). This is why the site works offline */}
            <Routes>
              {/* list of different browser URLs and the components we render when visiting them. Notice these are all pages. You can try this in the browser */}
              <Route path="/955-scouting-pwa" element={<Dashboard />} />
              <Route path="/955-scouting-pwa/qrscan" element={<QRScan />} />
              <Route path="/955-scouting-pwa/offline" element={<Offline />} />
            </Routes>
          </BrowserRouter>
        </HasData.Provider>
      </SelectedEvent.Provider>
    </SelectedWeek.Provider>
  );
}

export default App;
