import "./styles/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import { Settings } from "./pages/settings";
import { QRScan } from "./pages/qrscan";
import { useState } from "react";

function App() {
  const [eventId, setEventId] = useState("");
  const [eventWeek, setEventWeek] = useState(1);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/955-scouting-pwa"
          element={
            <Dashboard
              appWeek={eventWeek}
              appKey={eventId}
              setEWeek={(w) => setEventWeek(w)}
              setEId={(id) => setEventId(id)}
            />
          }
        />
        <Route
          path="/955-scouting-pwa/settings"
          element={<Settings id={eventId} week={eventWeek} />}
        />
        <Route path="/955-scouting-pwa/qrscan" element={<QRScan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
