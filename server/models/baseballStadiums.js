const { Schema } = require("mongoose");

const stadiumBaseSchema = require("./stadiumBase");

const baseballSchema = new Schema({
    ...stadiumBaseSchema.obj,
    league: {
        type: String,
        enum: ["AL", "NL"],
    }
});

module.exports = baseballSchema;