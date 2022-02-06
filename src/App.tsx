import "./styles/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import { Settings } from "./pages/settings";
import { QRScan } from "./pages/qrscan";
import {useContext, createContext, useState} from "react";
import { copyFileSync } from "fs";

function App() {
  const currentSchedule = createContext([]);
  let schedule = []
  //const [schedule,setSchedule] = useState([]);

  return (
    <currentSchedule.Provider value={schedule}>
    
    <BrowserRouter>
      <Routes>
        <Route path="/955-scouting-pwa" element={<Dashboard setSchedule={(s)=>schedule=s}/>} />
        <Route path="/955-scouting-pwa/settings" element={<Settings matchList={schedule}/>} />
        <Route path="/955-scouting-pwa/qrscan" element={<QRScan />} />
      </Routes>
    </BrowserRouter>
    </currentSchedule.Provider>
  );
}

export default App;
