const { Schema } = require("mongoose");

const stadiumBaseSchema = require("./stadiumBase");

const footballSchema = new Schema({
    ...stadiumBaseSchema.obj,
    conference: {
        type: String,
        enum: ["AFC", "NFC"],
    }
});


module.exports = footballSchema;