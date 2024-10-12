const { Schema } = require("mongoose");

const stadiumBaseSchema = new Schema({
    stadiumName: {
        type: String,
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    cityName: {
        type: String,
    },
    stateName: {
        type: String,
    }
}, {
    _id: false
});

module.exports = stadiumBaseSchema;
