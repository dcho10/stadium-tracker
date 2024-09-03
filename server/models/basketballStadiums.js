const { Schema } = require("mongoose");

const stadiumBaseSchema = require("./stadiumBase");

const basketballSchema = new Schema({
    ...stadiumBaseSchema.obj,
});


module.exports = basketballSchema;