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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              width="18px"
            >
              <path d="M271.1 367.5L227.9 313.7c-8.688-10.78-23.69-14.51-36.47-8.974l-108.5 46.51c-13.91 6-21.49 21.19-18.11 35.79l23.25 100.8C91.32 502 103.8 512 118.5 512c107.4 0 206.1-37.46 284.2-99.65l-88.75-69.56C300.6 351.9 286.6 360.3 271.1 367.5zM630.8 469.1l-159.6-125.1c65.03-78.97 104.7-179.5 104.7-289.5c0-14.66-9.969-27.2-24.22-30.45L451 .8125c-14.69-3.406-29.73 4.213-35.82 18.12l-46.52 108.5c-5.438 12.78-1.771 27.67 8.979 36.45l53.82 44.08C419.2 232.1 403.9 256.2 386.2 277.4L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.84 3.158 5.121 9.189c-8.188 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z" />
            </svg>
          </Link>
          <p className="navtext">Offline</p>
        </div>
      </div>
    </div>
  );
}
