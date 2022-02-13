// Contains the navbar at bottom of screen
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
          <Link to="/955-scouting-pwa/settings">
            <svg
              style={{ height: "18px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M448 80V128C448 172.2 347.7 208 224 208C100.3 208 0 172.2 0 128V80C0 35.82 100.3 0 224 0C347.7 0 448 35.82 448 80zM393.2 214.7C413.1 207.3 433.1 197.8 448 186.1V288C448 332.2 347.7 368 224 368C100.3 368 0 332.2 0 288V186.1C14.93 197.8 34.02 207.3 54.85 214.7C99.66 230.7 159.5 240 224 240C288.5 240 348.3 230.7 393.2 214.7V214.7zM54.85 374.7C99.66 390.7 159.5 400 224 400C288.5 400 348.3 390.7 393.2 374.7C413.1 367.3 433.1 357.8 448 346.1V432C448 476.2 347.7 512 224 512C100.3 512 0 476.2 0 432V346.1C14.93 357.8 34.02 367.3 54.85 374.7z" />
            </svg>
          </Link>
          <p className="navtext">Data</p>
        </div>
      </div>
    </div>
  );
}
