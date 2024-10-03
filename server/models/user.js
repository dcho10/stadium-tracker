const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const { MLBSchema } = require("./baseballStadiums");
const { NBASchema } = require("./basketballStadiums");
const { NFLSchema } = require("./footballStadiums");
const { NHLSchema } = require("./hockeyStadiums");

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
    baseballStadiums: [MLBSchema],
    basketballStadiums: [NBASchema],
    footballStadiums: [NFLSchema],
    hockeyStadiums: [NHLSchema],
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
