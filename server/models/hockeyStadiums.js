const { Schema, model } = require("mongoose");

const stadiumBaseSchema = require("./stadiumBase");

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

const NHLModel = model("NHL", NHLSchema);

module.exports = { NHLSchema, NHLModel };