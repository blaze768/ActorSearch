import React, { useState, useEffect, useCallback} from 'react'
import './App.css';
import fetch from 'node-fetch';

function App() {
  const [name, setName] = useState('')
  const [movInfo, setMovInfo] = useState([])

  const fetchData = useCallback(() => {
    fetch(`https://api.themoviedb.org/3/search/person?api_key=07a240cb378733627b949d3c46e885c3&language=en-US&query=${name}`
      , {
      method:"GET",
      header: {
          "Content-Type": "application/json"
      },
    })
    .then(res=>res.json())
    .then(response => {
      for (var i=0; i<response.results.length; i++){
        if (response.results[i].name == name){
          setMovInfo(response.results.known_for)
        }
        else{
          setMovInfo(null)
        }
      }
    })
    .catch(error => console.log(error))
  },[name])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Search for an Actor
        </h1>
        <input value={name} onChange={e => setName(e.target.value)}/> 
        <button type='button' onClick={fetchData}>Find Actor Info</button>
        {console.log(movInfo)}
      </header>
      <main>
        {movInfo &&
          <blockquote>
            "{movInfo && movInfo.results}"
          </blockquote>
        }
      </main>
    </div>
  );
}

export default App;
