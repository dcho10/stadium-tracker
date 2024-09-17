const { Schema, model } = require("mongoose");

const stadiumBaseSchema = require("./stadiumBase");

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

const NFLModel = model("NFL", NFLSchema);

module.exports = { NFLSchema, NFLModel };