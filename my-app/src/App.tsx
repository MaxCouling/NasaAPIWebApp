import axios from "axios";
import { useState } from 'react';
import './App.css';

import unitiled from './Untitled.png';


function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [superhero, setSuperhero] = useState("");
  const [superheroInfo, setsuperheroInfo] = useState<undefined | any>(undefined);
  const options = {
    method: 'GET',
    url: 'https://superhero-search.p.rapidapi.com/api/',
    params: {hero: "spiderman"},
    headers: {
      'X-RapidAPI-Key': 'b66341a690msh63fbe70dfb535aep17129bjsn6ab6c80d1580',
      'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
    }
  };
  
  return (
    <div>
      <h1>
        Superhero lookup
      </h1>
      
      <div>
        
        <label>Favorite Superhero</label>
        <br/>
        
        <input 
          type="text" 
          id="superhero" 
          name="superhero" 
          onChange={(e) => setSuperhero(e.target.value)}
        >
        </input>
        <button onClick={search} >
        Search
        </button>
      </div>

      <p>
        You have entered {superhero}
      </p>
      {superheroInfo === undefined ? (

        <> 
        
        <img src={unitiled} />
      
      <p>Superhero not found</p>
        </>
      ) : (
        <div id="superhero-result">
          <img src={superheroInfo.images.md || unitiled} />
          <p>{superheroInfo.connections.groupAffiliation} </p>
        </div>
      )

      }
    </div>
  );
  function search(){
    options.params.hero = superhero;

    axios.request(options).then(function (response) {
      if(response.data === 'Hero Not Found') {setsuperheroInfo(undefined); return};
      setsuperheroInfo(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    //onChange={e => setSuperhero(e.target.value)}/><br/>
  }

}
export default App;