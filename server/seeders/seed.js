const db = require("../config/connection");
const { MLBModel } = require("../models");  // Make sure 'MLB' is correctly imported
const mlbSeeds = require("./mlbSeeds.json");

db.once("open", async () => {
    try {
        await MLBModel.deleteMany({});  // Clear the collection if necessary
        await MLBModel.insertMany(mlbSeeds);  // Seed the new data

        console.log("MLB Stadiums seeded successfully");
    } catch (err) {
        console.error("Error seeding MLB Stadiums:", err);
    } finally {
        process.exit(0);  // Exit the process when done
    }
});
