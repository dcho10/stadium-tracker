const { Schema } = require("mongoose");

const stadiumBaseSchema = require("./stadiumBase");

const basketballSchema = new Schema({
    ...stadiumBaseSchema.obj,
    conference: {
        type: String,
        enum: ["Eastern", "Western"],
    }
});


module.exports = basketballSchema;