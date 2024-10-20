const { Schema, model } = require("mongoose");
const stadiumBaseSchema = require("./stadiumBase");

// Set up NHL schema which inherits the base stadium model, with additions of conference and division
const NHLSchema = new Schema({
    ...stadiumBaseSchema.obj,
    conference: {
        type: String,
        enum: ["Eastern", "Western"],
    },
    division: {
        type: String,
        enum: ["Atlantic", "Metropolitan", "Central", "Pacific"]
    }
});

// Create NHL model and export
const NHLModel = model("NHL", NHLSchema);

module.exports = { NHLSchema, NHLModel };