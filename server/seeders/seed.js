const db = require("../config/connection");
const { MLBModel } = require("../models"); 
const { NBAModel } = require("../models");
const { NFLModel } = require("../models");
const { NHLModel } = require("../models");

const MLBSeeds = require("./mlbSeeds.json");
const NBASeeds = require("./nbaSeeds.json");
const NFLSeeds = require("./nflSeeds.json");
const NHLSeeds = require("./nhlSeeds.json");

const cleanDB = require("./cleanDB");

db.once("open", async () => {
    try {
        await cleanDB("MLBModel", "mlbs");
        await cleanDB("NBAModel", "nbas");
        await cleanDB("NFLModel", "nfls");
        await cleanDB("NHLModel", "nhls")
        
        await MLBModel.insertMany(MLBSeeds);
        await NBAModel.insertMany(NBASeeds);
        await NFLModel.insertMany(NFLSeeds);
        await NHLModel.insertMany(NHLSeeds);

        console.log("All stadiums seeded successfully");
    } catch (err) {
        console.error("Error seeding stadiums:", err);
    } finally {
        process.exit(0);
    }
});