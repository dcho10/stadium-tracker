const db = require("../config/connection");
const { User, MLBModel, NBAModel, NFLModel, NHLModel } = require("../models");

const userSeeds = require("./userSeeds.json");
const MLBSeeds = require("./mlbSeeds.json");
const NBASeeds = require("./nbaSeeds.json");
const NFLSeeds = require("./nflSeeds.json");
const NHLSeeds = require("./nhlSeeds.json");

const cleanDB = require("./cleanDB");

db.once("open", async () => {
    try {
        // Clean the database
        await cleanDB("User", "users");
        await cleanDB("MLBModel", "mlbs");
        await cleanDB("NBAModel", "nbas");
        await cleanDB("NFLModel", "nfls");
        await cleanDB("NHLModel", "nhls");

        const mlbSeeds = await MLBModel.insertMany(MLBSeeds);
        const nbaSeeds = await NBAModel.insertMany(NBASeeds);
        const nflSeeds = await NFLModel.insertMany(NFLSeeds);
        const nhlSeeds = await NHLModel.insertMany(NHLSeeds);

        const mlbStadiumMap = Object.fromEntries(mlbSeeds.map(stadium => [stadium.stadiumName, stadium._id]));
        const nbaStadiumMap = Object.fromEntries(nbaSeeds.map(stadium => [stadium.stadiumName, stadium._id]));
        const nflStadiumMap = Object.fromEntries(nflSeeds.map(stadium => [stadium.stadiumName, stadium._id]));
        const nhlStadiumMap = Object.fromEntries(nhlSeeds.map(stadium => [stadium.stadiumName, stadium._id]));

        const updatedUserSeeds = userSeeds.map(user => ({
            ...user,
            baseballStadiums: Array.isArray(user.baseballStadiums) 
              ? user.baseballStadiums.map(stadium => ({
                  stadiumId: mlbStadiumMap[stadium.stadiumName], // Use mapped stadium ID
                  stadiumName: stadium.stadiumName,
                  teamName: stadium.teamName,
                  hasVisited: stadium.hasVisited,
                  dateVisited: stadium.dateVisited ? new Date(stadium.dateVisited) : null,
                })).filter(stadium => stadium.stadiumId) // Only keep valid stadium IDs
              : [],
            basketballStadiums: Array.isArray(user.basketballStadiums) 
              ? user.basketballStadiums.map(stadium => ({
                  stadiumId: nbaStadiumMap[stadium.stadiumName],
                  stadiumName: stadium.stadiumName, 
                  teamName: stadium.teamName,
                  hasVisited: stadium.hasVisited,
                  dateVisited: stadium.dateVisited ? new Date(stadium.dateVisited) : null,
                })).filter(stadium => stadium.stadiumId)
              : [],
            footballStadiums: Array.isArray(user.footballStadiums) 
              ? user.footballStadiums.map(stadium => ({
                  stadiumId: nflStadiumMap[stadium.stadiumName],
                  stadiumName: stadium.stadiumName,
                  teamName: stadium.teamName,
                  hasVisited: stadium.hasVisited,
                  dateVisited: stadium.dateVisited ? new Date(stadium.dateVisited) : null,
                })).filter(stadium => stadium.stadiumId)
              : [],
            hockeyStadiums: Array.isArray(user.hockeyStadiums) 
              ? user.hockeyStadiums.map(stadium => ({
                  stadiumId: nhlStadiumMap[stadium.stadiumName], 
                  stadiumName: stadium.stadiumName,
                  teamName: stadium.teamName,
                  hasVisited: stadium.hasVisited,
                  dateVisited: stadium.dateVisited ? new Date(stadium.dateVisited) : null,
                })).filter(stadium => stadium.stadiumId)
              : [],
          }));
          
          await User.create(updatedUserSeeds);

        console.log("All stadiums and users seeded successfully");
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        process.exit(0);
    }
});
