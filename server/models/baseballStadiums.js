const { Schema } = require("mongoose");

const stadiumBaseSchema = require("./stadiumBase");

const baseballSchema = new Schema({
    ...stadiumBaseSchema.obj,
});

module.exports = baseballSchema;