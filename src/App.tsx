import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import configuration from "./utils/configuration";

// Define an interface to represent the expected structure of playerData
interface PlayerData {
  name: string;
  summonerLevel: number;
  profileIconId: number;
  // Add other properties as needed based on the API response
}

function App() {
  const [searchPlayer, setSearchPlayer] = useState("");
  const API = configuration.API_KEY;
  const [playerData, setPlayerData] = useState<PlayerData | null>(null); // Use the PlayerData interface here

  console.log(searchPlayer);

  function searchForPlayer(event: React.MouseEvent<HTMLButtonElement>) {
    let APICALL =
      "https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      searchPlayer +
      "?api_key=" +
      API;
    axios
      .get<PlayerData>(APICALL) // Specify the expected response data type
      .then((response) => {
        setPlayerData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <div className="container">
        <h1> League of Legend Player Searcher</h1>
        <input
          type="text"
          onChange={(e) => setSearchPlayer(e.target.value)}
        ></input>
        <button onClick={(e) => searchForPlayer(e)}> Search for player</button>
      </div>
      {playerData ? (
        <>
          <p>{playerData.name}</p>
          <img
            src={
              "http://ddragon.leagueoflegends.com/cdn/13.17.1/img/profileicon/" +
              playerData.profileIconId +
              ".png"
            }
            alt="profile icon"
            width="100"
            height="100"
          ></img>
          <p> Summoner level: {playerData.summonerLevel}</p>
        </>
      ) : (
        <p>Player not found</p>
      )}
    </div>
  );
}

export default App;
