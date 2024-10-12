const { Schema, Types, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    lastName: {
        type: String,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minLength: 12,
    },
    baseballStadiums: [
        {
            stadiumId: {
              type: Schema.Types.ObjectId,
              ref: "MLBModel",
            },
            stadiumName: {
                type: String,
                required: true,
            },
            teamName: {
                type: String,
                required: true,
            },
            hasVisited: {
              type: Boolean,
              default: false,
            },
            dateVisited: {
              type: Date,
              default: null,
            },
        },
    ],
    footballStadiums: [
        {
            stadiumId: {
              type: Schema.Types.ObjectId,
              ref: "NFLModel",
            },
            stadiumName: {
                type: String,
                required: true,
            },
            teamName: {
                type: String,
                required: true,
            },
            hasVisited: {
              type: Boolean,
              default: false,
            },
            dateVisited: {
              type: Date,
              default: null,
            },
        },
    ],
    basketballStadiums: [
        {
            stadiumId: {
              type: Schema.Types.ObjectId,
              ref: "NBAModel",
            },
            stadiumName: {
                type: String,
                required: true,
            },
            teamName: {
                type: String,
                required: true,
            },
            hasVisited: {
              type: Boolean,
              default: false,
            },
            dateVisited: {
              type: Date,
              default: null,
            },
        },
    ],
    hockeyStadiums: [
        {
            stadiumId: {
              type: Schema.Types.ObjectId,
              ref: "NHLModel",
            },
            stadiumName: {
                type: String,
                required: true,
            },
            teamName: {
                type: String,
                required: true,
            },
            hasVisited: {
              type: Boolean,
              default: false,
            },
            dateVisited: {
              type: Date,
              default: null,
            },
        },
    ],
})

userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next ();
})

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
