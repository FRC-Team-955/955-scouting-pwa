import {useState} from 'react'
import QRCode from 'qrcode'
import './styles/App.css';

function App() {
  const [qr, setQr] = useState("")

  async function generateQR(text){
    try {
      setQr(await QRCode.toDataURL(text))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Scouting App</h5>
        <h6 className="card-subtitle mb-2 text-muted">I luv scouting</h6>
        <p className="card-text">You installed everything correctly!</p>
        <button onClick={()=>generateQR('123,456,789')}>QR</button>
        <img src={qr} alt=''></img>
      </div>
    </div>
  );
}

export default App;
