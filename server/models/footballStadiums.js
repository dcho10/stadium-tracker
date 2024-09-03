const { Schema } = require("mongoose");

const stadiumBaseSchema = require("./stadiumBase");

const footballSchema = new Schema({
    ...stadiumBaseSchema.obj,
});


module.exports = footballSchema;