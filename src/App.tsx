import "./styles/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import { Settings } from "./pages/settings";
import { QRScan } from "./pages/qrscan";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/955-scouting-pwa" element={<Dashboard />} />
        <Route path="/955-scouting-pwa/settings" element={<Settings />} />
        <Route path="/955-scouting-pwa/qrscan" element={<QRScan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
