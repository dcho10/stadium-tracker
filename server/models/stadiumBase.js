const { Schema, Types } = require("mongoose");

const stadiumBaseSchema = new Schema({
    stadiumId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
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
    },
    hasVisited: {
        type: Boolean,
        required: true,
        default: false,
    },
    dateVisited: {
        type: Date,
    }
}, {
    _id: false
});

module.exports = stadiumBaseSchema;
