import { useState } from "react";

import { getMatchDataFirebase } from "../api/firebase-api";
import CsvViewer from "./csv-viewer";

export default function ButtonBar({ lockDropdown, lock, unlock, eventKey }) {
  const [showCsvViewer, setShowCsvViewer] = useState(false); // wheather the csv downloader is shown
  return (
    <>
      {/* lock icon to prevent changes to selected event */}
      {lockDropdown ? (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="lock"
          className="svg-inline--fa fa-lock"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height="1.599rem"
          onClick={unlock}
          style={{ display: "inline", float: "right", marginLeft: "1rem" }}
        >
          <path
            fill="currentColor"
            d="M384 223.1L368 224V144c0-79.41-64.59-144-144-144S80 64.59 80 144V224L64 223.1c-35.35 0-64 28.65-64 64v160c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64v-160C448 252.7 419.3 223.1 384 223.1zM144 144C144 99.88 179.9 64 224 64s80 35.88 80 80V224h-160V144z"
          ></path>
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="lock-open"
          className="svg-inline--fa fa-lock-open"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          height="1.599rem"
          onClick={lock}
          style={{ display: "inline", float: "right", marginLeft: "1rem" }}
        >
          <path
            fill="currentColor"
            d="M446.4 .7031C360.5-7.664 288 59.85 288 144V224H64C28.65 224 0 252.7 0 288v160c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V288c0-35.35-28.65-64-64-64h-32V144c0-46.89 40.52-84.46 88.37-79.57C481.1 68.68 512 106.9 512 148.7V208C512 216.8 519.2 224 528 224h32C568.8 224 576 216.8 576 208V150.4C576 75.24 521.2 7.992 446.4 .7031z"
          ></path>
        </svg>
      )}

      {/* Cloud icon to show/hide csv downloader */}
      {showCsvViewer ? (
        <CsvViewer exit={() => setShowCsvViewer(false)} eventId={eventKey} />
      ) : (
        <></>
      )}
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="cloud-arrow-down"
        className="svg-inline--fa fa-cloud-arrow-down"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        width="2rem"
        onClick={() => setShowCsvViewer(true)}
        style={{ display: "inline", float: "right" }}
      >
        <path
          fill="currentColor"
          d="M537.6 226.6C541.7 215.9 544 204.2 544 192c0-53-43-96-96-96c-19.69 0-38.09 6-53.31 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.703 .1094 5.445 .2031 8.133C40.2 219.8 0 273.2 0 336C0 415.5 64.5 480 144 480H512c70.69 0 128-57.3 128-128C640 290.1 596 238.4 537.6 226.6zM424.1 320.1l-88 88C334.4 411.5 328.5 416 320 416s-14.4-4.467-16.97-7.031l-88-88c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L296 334.1V184C296 170.8 306.8 160 320 160s24 10.75 24 24v150.1l47.03-47.03c9.375-9.375 24.56-9.375 33.94 0S434.3 311.6 424.1 320.1z"
        ></path>
      </svg>
      {/* Reload iccon to refresh data from firebase */}
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="arrows-rotate"
        className="svg-inline--fa fa-arrows-rotate"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="1.599rem"
        onClick={getMatchDataFirebase}
        style={{ display: "inline", float: "right", marginRight: "1rem" }}
      >
        <path
          fill="currentColor"
          d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"
        ></path>
      </svg>
      {/* Calander icon to add a new schedule (not implimented) */}
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="calendar-plus"
        className="svg-inline--fa fa-calendar-plus"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        height="1.599rem"
        onClick={() => {}}
        style={{ display: "inline", float: "right", marginRight: "1rem" }}
      >
        <path
          fill="currentColor"
          d="M96 32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32zM448 464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192H448V464zM200 272V328H144C130.7 328 120 338.7 120 352C120 365.3 130.7 376 144 376H200V432C200 445.3 210.7 456 224 456C237.3 456 248 445.3 248 432V376H304C317.3 376 328 365.3 328 352C328 338.7 317.3 328 304 328H248V272C248 258.7 237.3 248 224 248C210.7 248 200 258.7 200 272z"
        ></path>
      </svg>
    </>
  );
}
