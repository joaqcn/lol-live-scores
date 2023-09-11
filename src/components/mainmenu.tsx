import React, { useState } from "react";
import axios from "axios";
import configuration from "../utils/configuration";

// Define an interface to represent the expected structure of playerData
interface PlayerData {
  name: string;
  summonerLevel: number;
  profileIconId: number;
  puuid: string;
  id: string; // Add the id property to store the summoner id
}

// Define an interface to represent the expected structure of ranked data
interface RankedData {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

const MainMenu = () => {
  const [rankedData, setRankedData] = useState<RankedData | null>(null);
  const [searchPlayer, setSearchPlayer] = useState("");
  const API = configuration.API_KEY;
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);


  function searchForPlayer(event: React.MouseEvent<HTMLButtonElement>) {
    let APICALL =
      "https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      searchPlayer +
      "?api_key=" +
      API;
      
    axios
      .get<PlayerData>(APICALL)
      .then((response) => {
        setPlayerData(response.data);
        console.log(response.data);

        // Make a second API request to get ranked data
        let RANKEDAPICALL =
          "https://la1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
          response.data.id +
          "?api_key=" +
          API;

        axios
          .get<RankedData[]>(RANKEDAPICALL)
          .then((rankedResponse) => {
            // Find the entry with queueType "RANKED_SOLO_5x5"
            const soloRankedData = rankedResponse.data.find(
              (entry) => entry.queueType === "RANKED_SOLO_5x5"
            );

            if (soloRankedData) {
              setRankedData(soloRankedData);
              console.log(soloRankedData);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

function getWinRate(wins: number, losses: number) {
  const winrate = Math.round((wins / (wins + losses)) * 100);
  return winrate + "%";
}

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-4 bg-white rounded-lg ">
        <h1 className="text-3xl font-bold mb-4">Search for a player</h1>
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 border border-gray-300 px-2 py-1 rounded-l-md"
            onChange={(e) => setSearchPlayer(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-r-md hover:bg-blue-600"
            onClick={(e) => searchForPlayer(e)}
          >
            Search for player
          </button>
        </div>
        {playerData ? (
          <div className="mt-4 flex flex-col justify-center items-center">
            <p className="text-xl font-semibold">{playerData.name}</p>
            <div className="flex justify-center items-center">
              <img
                src={
                  "http://ddragon.leagueoflegends.com/cdn/13.17.1/img/profileicon/" +
                  playerData.profileIconId +
                  ".png"
                }
                alt="profile icon"
                className="rounded-full"
                width="100"
                height="100"
              />
            </div>
            <p className="mt-2">Summoner level: {playerData.summonerLevel}</p>
            <p> {playerData.puuid}</p>
          </div>
        ) : (
          <p className="mt-4">Player not found</p>
        )}
        {rankedData ? (
          <div className="mt-4">
            <p>Queue Type: {rankedData.queueType}</p>
            <p>Tier: {rankedData.tier}</p>
            <p>Rank: {rankedData.rank}</p>
            <p>League Points: {rankedData.leaguePoints}</p>
            <p>Wins: {rankedData.wins}</p>
            <p>Losses: {rankedData.losses}</p>
            <p>Winrate: {getWinRate(rankedData.wins,rankedData.losses)}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MainMenu;
