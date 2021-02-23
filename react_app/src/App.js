import React, { useState, useEffect} from 'react'
import './App.css';
import fetch from 'node-fetch';
//var movData = require('./data.json')

function App() {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [movInfo, setMovInfo] = useState([])
  const [isLoading, setLoading] = useState(true)

  //var url ='https://api.themoviedb.org/3/search/person?api_key=07a240cb378733627b949d3c46e885c3&language=en-US&query='+ firstName + '%20' + lastName

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/person?api_key=07a240cb378733627b949d3c46e885c3&language=en-US&query=${firstName}%20${lastName}`
      , {
      method:"GET",
      header: {
          "Content-Type": "application/json"
      },
    })
    .then(res=>res.json())
    .then(response => {
      setMovInfo(response)
      setLoading(false)
      //for (var i=0; i<response.results.length; i++){
        //if (response.results[i].name == firstName + ' '+ lastName){
          //setMovInfo(response.results.known_for[0])
        //}
        //else{
          //setMovInfo(null)
        //}
      //}
    })
    .catch(error => console.log(error))
  }, [movInfo])

  const handleChangeFirst = e => {
    setFirstName(e.target.value)
  }

  const handleChangeLast = e => {
    setLastName(e.target.value)
  }

  return (
    <div className="App">
      <h1>Actor Search Results</h1>
      <input value={firstName} onChange={handleChangeFirst} />
      <input value={lastName} onChange={handleChangeLast}/>
      {isLoading && <p> Loading Search Results...</p>}
      <button onClick={console.log(movInfo)}>Find Actor Info</button>
      {movInfo && (
        Object.keys(movInfo).length === 0
          ? <p>No Results</p>
          :<div>
            {Object.entries(movInfo).map(([movInfo]) => (
              <span style= {StyleSheet}>
                {movInfo}
                {' '}
              </span>
            ))}
          </div>
      )}
    </div>
  );
}

export default App;
