import "../styles/nav.css";
import { Link } from "react-router-dom";
import qrcodeImage from "../styles/images/qrcode.png";
import penImage from "../styles/images/pen.png";

export default function Nav({ selectedPage }) {
  return (
    <div id="navbar">
      <div id="nav-box">
        <div className={`nav-frame ${selectedPage !== 0 ? "nav-gray" : ""}`}>
          <Link to="/955-scouting-pwa/qrscan">
            <img className="nav-icon" src={qrcodeImage} alt="" />
          </Link>
          <p className="navtext">Scan</p>
        </div>
        <div className={`nav-frame ${selectedPage !== 1 ? "nav-gray" : ""}`}>
          <Link to="/955-scouting-pwa/">
            <img className="nav-icon" src={penImage} alt="" />
          </Link>
          <p className="navtext">Scouting</p>
        </div>
        <div className={`nav-frame ${selectedPage !== 2 ? "nav-gray" : ""}`}>
          <Link to="/955-scouting-pwa/offline">
            <img className="nav-icon" src={penImage} alt="" />
          </Link>
          <p className="navtext">Offline</p>
        </div>
      </div>
    </div>
  );
}
