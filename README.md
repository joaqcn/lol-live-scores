# League of Legends Tracking App
This is a simple web application for tracking League of Legends (LoL) player information, including their summoner details and ranked statistics. It allows users to search for a LoL player by their in-game name and provides information about the player's profile, such as summoner level, profile icon, and ranked statistics.

## Features
Player Search: Users can enter a LoL player's in-game name to search for their summoner details.

Summoner Information: Once a player is found, the app displays their summoner name, level, profile icon, and unique identifier (puuid).

Ranked Statistics: The app fetches and displays the player's ranked information, including tier, rank, league points, wins, losses, and winrate.

## Technologies Used
React: The app is built using the React JavaScript library, making it a dynamic and interactive user interface.

Axios: Axios is used to make HTTP requests to the Riot Games API to fetch player and ranked data.

Riot Games API: The app leverages the Riot Games API to retrieve player information and ranked statistics.

## Getting Started
To run this app locally, follow these steps:

Clone this repository to your local machine:



git clone https://github.com/your-username/lol-tracking-app.git
Navigate to the project directory:


cd lol-tracking-app
Install dependencies:


npm install
Configure your Riot Games API key:

Obtain a Riot Games API key from the Riot Developer Portal.

Create a file named configuration.ts in the utils directory.

## Inside configuration.ts, export your API key as follows:

export const configuration = {
  API_KEY: "YOUR_RIOT_API_KEY",
};
Start the development server:

sql
Copy code
npm start
Open your web browser and go to http://localhost:3000 to use the app.

Usage
Enter the LoL player's in-game name in the search input field.

Click the "Search for player" button to retrieve the player's information.

The app will display the player's summoner information and ranked statistics, including tier, rank, league points, wins, losses, and winrate.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
Special thanks to Riot Games for providing access to the League of Legends API.
