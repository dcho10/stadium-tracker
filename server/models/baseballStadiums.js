const { Schema, model } = require("mongoose");
const stadiumBaseSchema = require("./stadiumBase");

// Set up MLB schema which inherits the base stadium model, with additions of league and division
const MLBSchema = new Schema({
    ...stadiumBaseSchema.obj,
    league: {
        type: String,
        enum: ["AL", "NL"],
    },
    division: {
        type: String,
        enum: ["AL East", "AL Central", "AL West", "NL East", "NL Central", "NL West"]
    }
});

// Create MLB model and export
const MLBModel = model("MLB", MLBSchema);

module.exports = { MLBSchema, MLBModel };