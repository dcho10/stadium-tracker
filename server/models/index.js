// Set up models
const User = require("./User.js");
const { MLBModel } = require("./baseballStadiums.js");
const { NBAModel } = require("./basketballStadiums.js");
const { NFLModel } = require("./footballStadiums.js");
const { NHLModel } = require("./hockeyStadiums.js")

module.exports = { User, MLBModel, NBAModel, NFLModel, NHLModel };