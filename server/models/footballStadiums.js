const { Schema, model } = require("mongoose");
const stadiumBaseSchema = require("./stadiumBase");

// Set up NFL schema which inherits the base stadium model, with additions of league and division
const NFLSchema = new Schema({
    ...stadiumBaseSchema.obj,
    conference: {
        type: String,
        enum: ["AFC", "NFC"],
    },
    division: {
        type: String,
        enum: ["East", "North", "South", "West"]
    }
});

// Create NHL model and export
const NFLModel = model("NFL", NFLSchema);

module.exports = { NFLSchema, NFLModel };