const { Schema, Types } = require("mongoose");

const basketballSchema = new Schema(
    {
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
            required: true,
        }
    }
);

module.exports = basketballSchema;