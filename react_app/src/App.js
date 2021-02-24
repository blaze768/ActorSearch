import React, { useState, useCallback} from 'react'
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
    .then(response => setMovInfo([response]))
    .catch(error => console.log(error))
  },[name])

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Search for an Actor
        </h1>
        <input value={name} onChange={e => setName(e.target.value)}/> 
        <button type='button' onClick={fetchData}>Find Actor's Info</button>
        {console.log(movInfo)}
      </header>
      <main>
        {movInfo.map((data, key) => {
          return(
            <div key={key}>
              {data.results[0].known_for[0].title +
              ", " +
              data.results[0].known_for[0].overview +
              ", " +
              data.results[0].known_for[0].poster_path +
              ", " +
              data.results[0].known_for[1].title +
              ", " +
              data.results[0].known_for[1].overview +
              ", " +
              data.results[0].known_for[1].poster_path +
              ", " +
              data.results[0].known_for[2].title +
              ", " +
              data.results[0].known_for[2].overview +
              ", " +
              data.results[0].known_for[2].poster_path
              }
            </div>
          )
        })}
      </main>
    </div>
  );
}

export default App;
