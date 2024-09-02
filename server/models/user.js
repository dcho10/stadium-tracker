const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const baseballSchema = require("./baseballStadiums");
const basketballSchema = require("./basketballStadiums");
const footballSchema = require("./footballStadiums");
const hockeySchema = require("./hockeyStadiums");

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
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
    baseballStadiums: [baseballSchema],
    basketballStadiums: [basketballSchema],
    footballStadiums: [footballSchema],
    hockeyStadiums: [hockeySchema],
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = model('User', userSchema);

module.exports = User;
