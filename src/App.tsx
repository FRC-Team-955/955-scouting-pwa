import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";

import Prototype from "./pages/prototype";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Dashboard />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/955-scouting-pwa/proto" element={<Prototype />} />
    //     <Route path="/955-scouting-pwa/" element={<Dashboard />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
