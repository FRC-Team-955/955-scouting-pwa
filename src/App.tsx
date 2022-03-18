import React, { useState, useMemo } from "react";
import Dashboard from "./pages/dashboard";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SelectedWeek, SelectedEvent, HasData } from "./context";
import QRScan from "./pages/qr-scan";
import Offline from "./pages/offline";

function App() {
  const [week, setWeek] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [hasData, setHasData] = useState([]);
  return (
    <SelectedWeek.Provider value={useMemo(() => ({ week, setWeek }), [week])}>
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
            <Routes>
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
