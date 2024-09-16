const { Schema, model } = require("mongoose");
const stadiumBaseSchema = require("./stadiumBase");

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

const MLBModel = model("MLB", MLBSchema);

module.exports = { MLBSchema, MLBModel } ;