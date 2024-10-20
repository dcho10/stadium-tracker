const { Schema, Types, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Create User schema which rakes values of first name, last name, email, password, all the stadiums that they have visited referred by the id of each stadium model, and the dates which they have visited those stadiums
// Included regex to verify validity of email
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
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minLength: 12,
    },
    // Show all visited stadiums with stadiumId as a reference to each respective league's stadium ID
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

// Save the password that the user creates and hash it using bcrypt
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next ();
})

// Compares the password inputted with the password in the database to ensure the user is entering the correct password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create User model and export
const User = model('User', userSchema);

module.exports = User;
