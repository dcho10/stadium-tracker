const { Schema } = require("mongoose");

const stadiumBaseSchema = require("./stadiumBase");

const hockeySchema = new Schema({
    ...stadiumBaseSchema.obj,
    conference: {
        type: String,
        enum: ["Eastern", "Western"],
    }
});


module.exports = hockeySchema;