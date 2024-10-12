const { User, MLBModel, NBAModel, NFLModel, NHLModel } = require("../models")
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
            .populate("baseballStadiums")
            .populate("basketballStadiums")
            .populate("footballStadiums")
            .populate("hockeyStadiums")
        },
        user: async (parent, { userId }) => {
            return User.findById({ _id: userId })
            .populate("baseballStadiums")
            .populate("basketballStadiums")
            .populate("footballStadiums")
            .populate("hockeyStadiums")
        },
        mlbStadiums: async () => {
            return MLBModel.find();
        },
        nflStadiums: async () => {
            return NFLModel.find();
        },
        nbaStadiums: async () => {
            return NBAModel.find();
        },
        nhlStadiums: async () => {
            return NHLModel.find();
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
                throw new Error("Incorrect email or password, please try again.")
            }

            const correctPass = await user.isCorrectPassword(password);

            if (!correctPass) {
                throw new Error("Incorrect email or password, please try again.")
            }

            console.log(user);
            const token = signToken(user);

            return { token, user };
        },
        addMLBVisit: async (parent, { userId, stadiumId, dateVisited }) => {
            try {
                const stadium = await MLBModel.findById(stadiumId);
                if (!stadium) {
                    throw new Error('Stadium not found');
                }
            
                const user = await User.findById(userId);

                if (!user) {
                    throw new Error('User not found');
                }
                
                return await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            baseballStadiums: {
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
            } catch (error) {
                console.error(error);
                throw new Error('Failed to add MLB visit');
            }
        },
        deleteMLBVisit: async (parent, { userId, stadiumId }) => {
            try {
              const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                  $pull: {
                    baseballStadiums: { stadiumId }
                  }
                },
                { new: true }
              );
              
              if (!updatedUser) {
                throw new Error("User not found");
              }
          
              return updatedUser;
            } catch (error) {
              console.error(error);
              throw new Error("Failed to delete MLB visit");
            }
        },
        addNFLVisit: async (parent, { userId, stadiumId, dateVisited }) => {
            try {
                const stadium = await NFLModel.findById(stadiumId);
                
                if (!stadium) {
                    throw new Error('Stadium not found');
                }
        
                return await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            footballStadiums: {
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
            } catch (error) {
                console.error(error);
                throw new Error('Failed to add MLB visit');
            }
        },
        deleteNFLVisit: async (parent, { userId, stadiumId }) => {
            try {
              const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                  $pull: {
                    footballStadiums: { stadiumId }
                  }
                },
                { new: true }
              );
              
              if (!updatedUser) {
                throw new Error("User not found");
              }
          
              return updatedUser;
            } catch (error) {
              console.error(error);
              throw new Error("Failed to delete MLB visit");
            }
        },
        addNBAVisit: async (parent, { userId, stadiumId, dateVisited }) => {
            try {
                const stadium = await NBAModel.findById(stadiumId);
                
                if (!stadium) {
                    throw new Error('Stadium not found');
                }
        
                return await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            basketballStadiums: {
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
            } catch (error) {
                console.error(error);
                throw new Error('Failed to add MLB visit');
            }
        },
        deleteNBAVisit: async (parent, { userId, stadiumId }) => {
            try {
              const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                  $pull: {
                    basketballStadiums: { stadiumId }
                  }
                },
                { new: true }
              );
              
              if (!updatedUser) {
                throw new Error("User not found");
              }
          
              return updatedUser;
            } catch (error) {
              console.error(error);
              throw new Error("Failed to delete MLB visit");
            }
        },
        addNHLVisit: async (parent, { userId, stadiumId, dateVisited }) => {
            try {
                const stadium = await NHLModel.findById(stadiumId);
                
                if (!stadium) {
                    throw new Error('Stadium not found');
                }
        
                return await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            hockeyStadiums: {
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
            } catch (error) {
                console.error(error);
                throw new Error('Failed to add MLB visit');
            }
        },
        deleteNHLVisit: async (parent, { userId, stadiumId }) => {
            try {
              const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                  $pull: {
                    hockeyStadiums: { stadiumId }
                  }
                },
                { new: true }
              );
              
              if (!updatedUser) {
                throw new Error("User not found");
              }
          
              return updatedUser;
            } catch (error) {
              console.error(error);
              throw new Error("Failed to delete MLB visit");
            }
        }          
    }
}

module.exports = resolvers;