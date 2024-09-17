const { Schema, model } = require("mongoose");
const stadiumBaseSchema = require("./stadiumBase");

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

const NBAModel = model("NBA", NBASchema);

module.exports = { NBASchema, NBAModel };