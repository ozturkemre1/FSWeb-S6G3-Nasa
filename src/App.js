import React, {useEffect , useState} from "react";
import "./App.css";
import axios from "axios"
import APODViewer from "./components/APODViewer";

//https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2000-06-08&thumbs=true

function App() {
  const [apod,setApod] = useState();
  const [loaded,setLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0])


  function fetchAPOD(dateparam) {
    setLoaded(false)
    axios.get('https://api.nasa.gov/planetary/apod', {
    params: {
      api_key: "DjRdJnkaOqVtKPtVJXd9yukNwJ1PxSvdoSB6erlb",
      date: dateparam,
      thumbs: true,
    }
  })
  .then(function (response) {
    console.log(response);
    setApod(response.data)
    setLoaded(true)
  })
  .catch(function (error) {
    console.log(error);
    setLoaded(false)
  })
  .finally(function () {
    // always executed
  });  
  }
 
  useEffect(()=> {
    fetchAPOD(currentDate);
  },[currentDate])

  function dateChangeHandler(e) {
    console.log(e.target.value);
    setCurrentDate(e.target.value)
  }
  return (
    <div className="App">
      {!loaded && <p>Beklemede Kalın!</p>}
      {loaded && <>
        <label htmlFor="apodDate"><h2>SELECT DATE </h2></label>
      <input 
      onChange={(e) => dateChangeHandler(e)}
      type="date"
      value={currentDate}
      ></input>
        <APODViewer apod={apod}/>
      </>
      }
    </div>
  );
}

export default App;
