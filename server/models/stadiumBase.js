const { Schema } = require("mongoose");

// Set up based stadium schema so each respective league inherits the stadium base model
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
