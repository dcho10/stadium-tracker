const { Schema, model } = require("mongoose");
const stadiumBaseSchema = require("./stadiumBase");

// Set up NBA schema which inherits the base stadium model, with additions of conference and division
const NBASchema = new Schema({
    ...stadiumBaseSchema.obj,
    conference: {
        type: String,
        enum: ["Eastern", "Western"],
    },
    division: {
        type: String,
        enum: ["Atlantic", "Central", "Southeast", "Northwest", "Pacific", "Southwest"]
    }
});

// Create NBA model and export
const NBAModel = model("NBA", NBASchema);

module.exports = { NBASchema, NBAModel };