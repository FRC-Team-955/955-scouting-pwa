import {useState} from 'react'
import {sendScoutingData} from './api/firebase-api'
import QRCode from 'qrcode'
import QrReader from 'react-qr-scanner'
import './styles/App.css'

function App() {
  const [points, setPoints] = useState(0)
  const [team, setTeam] = useState(0)
  const [qr, setQr] = useState("")

  const [data, setData] = useState({text:'No Data'})
  const [showReader, setShowReader] = useState(false)

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

        <input placeholder='points' onChange={e => setPoints(e.target.value)}></input>
        <input placeholder='team' onChange={e => setTeam(e.target.value)}></input>

        <button className='btn btn-primary' onClick={()=>sendScoutingData({points,team})}>Send!</button>
        <button className='btn btn-primary' onClick={()=>generateQR(`${team}, ${points}`)}>QR</button>
        <img src={qr} alt=''></img>
        <hr/>
        
        <button className='btn btn-primary' onClick={()=>setShowReader(true)}>Start</button>
        <button className='btn btn-primary' onClick={()=>setShowReader(false)}>Stop</button>

        {showReader?
          <QrReader
          delay={100}
          onScan={d => {setData(d); if(d !== null)setShowReader(false)}}
          onError={e => console.log(e)}
          style={{height: 240,width: 240}}
          legacyMode={true}
          /> : <></>
        }
        <p>{data?data.text:""}</p>
      </div>
    </div>
  );
}

export default App;
