const { Schema } = require("mongoose");

const stadiumBaseSchema = require("./stadiumBase");

const hockeySchema = new Schema({
    ...stadiumBaseSchema.obj,
});


module.exports = hockeySchema;