const { User } = require("../models");
const bcrypt = require("bcrypt");
const { MLBModel, NBAModel, NFLModel, NHLModel } = require("../models")
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
        user: async (parent, { userId }) => {
            return User.findById({ _id: userId });
        },
    },

    Mutation: {
        addUser: async (parent, {firstName, lastName, email, password }) => {
            const user = await User.create({ firstName, lastName, email, password });
            const token = signToken(user);
            return { token, user }
        },
        updateUser: async (parent, { userId, firstName, lastName, email, password }) => {
            const updatedInfo = {};
            if (firstName) updatedInfo.firstName = firstName;
            if (lastName) updatedInfo.lastName = lastName;
            if (email) updatedInfo.email = email;
            if (password) updatedInfo.password = await bcrypt.hash(password, 10);

            return User.findByIdAndUpdate(userId, updatedInfo, { new: true })
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError
            }

            const correctPass = await user.isCorrectPassword(password);

            if (!correctPass) {
                throw new AuthenticationError
            }

            console.log(user);
            const token = signToken(user);

            return { token, user };
        },
        addVisit: async (parent, { userId, stadiumLeague, stadiumId, dateVisited }) => {
            const leagues = {
                MLB: "baseballStadiums",
                NBA: "basketballStadiums",
                NFL: "footballStadiums",
                NHL: "hockeyStadiums",
            };
        
            const stadiums = leagues[stadiumLeague];
        
            if (!stadiums) {
                throw new Error("Invalid league specified");
            }
        
            const StadiumModel = {
                MLB: MLBModel,
                NBA: NBAModel,
                NFL: NFLModel,
                NHL: NHLModel,
            }[stadiumLeague];
        
            const stadium = await StadiumModel.findById(stadiumId);
        
            if (!stadium) {
                throw new Error("Stadium not found");
            }
        
            return User.findByIdAndUpdate(
                { _id: userId },
                {
                    $push: {
                        [stadiums]: {
                            stadiumId,
                            stadiumName: stadium.stadiumName,
                            teamName: stadium.teamName,
                            hasVisited: true,
                            dateVisited,
                        },
                    },
                },
                { new: true }
            );
        },
        deleteVisit: async (parent, { userId, stadiumLeague, stadiumId }) => {
            const leagues = {
                MLB: "baseballStadiums",
                NBA: "basketballStadiums",
                NFL: "footballStadiums",
                NHL: "hockeyStadiums",
              };
        
              const stadiums = leagues[stadiumLeague];
        
              if (!stadiums) {
                throw new Error("Invalid league specified");
              }
        
              const updateVisit = await User.findByIdAndUpdate(
                { _id: userId },
                {
                  $pull: {
                    [stadiums]: { stadiumId }
                  }
                },
                { new: true }
              );
        
              if (!updateVisit) {
                throw new Error("User not found");
              }
        
              return updateVisit;
        }
    }
}

module.exports = resolvers;