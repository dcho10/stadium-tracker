const { User, MLBModel, NBAModel, NFLModel, NHLModel } = require("../models")
const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/auth");

// Set up resolvers queries and mutations
const resolvers = {
    Query: {
        // Get all users and their visited stadiums
        users: async () => {
            return User.find()
            .populate("baseballStadiums")
            .populate("basketballStadiums")
            .populate("footballStadiums")
            .populate("hockeyStadiums")
        },
        // Get single user based on the ID and their visited stadiums
        user: async (parent, { userId }) => {
            return User.findById({ _id: userId })
            .populate("baseballStadiums")
            .populate("basketballStadiums")
            .populate("footballStadiums")
            .populate("hockeyStadiums")
        },
        // Get each respective league's stadiums
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
        // addUser requires firstName, lastName, email, password as values, create a token for the user once account created
        addUser: async (parent, {firstName, lastName, email, password }) => {
            if (!firstName || !lastName || !email || !password) {
                throw new Error("Please fill in all required fields.")
            }

            const user = await User.create({ firstName, lastName, email, password });
            const token = signToken(user);

            return { token, user }
        },
        // updateUser to update user information
        updateUser: async (parent, { userId, firstName, lastName, email, password }) => {
            const updatedInfo = {};
            if (firstName) updatedInfo.firstName = firstName;
            if (lastName) updatedInfo.lastName = lastName;
            if (email) updatedInfo.email = email;
            if (password) updatedInfo.password = await bcrypt.hash(password, 10);
            
            return User.findByIdAndUpdate(userId, updatedInfo, { new: true })
        },
        // login checks the user's email, verifies if that user exists and if the passsword is correct
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
        // addMLBVisit adds a visited MLB stadium, checks to see if user and/or stadium exists, if both pass then the stadium will be marked as visited along with the date visited
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
        // addNFLVisit adds a visited MLB stadium, checks to see if user and/or stadium exists, if both pass then the stadium will be marked as visited along with the date visited
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
                throw new Error('Failed to add NF: visit');
            }
        },
        // addNBAVisit adds a visited MLB stadium, checks to see if user and/or stadium exists, if both pass then the stadium will be marked as visited along with the date visited
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
                throw new Error('Failed to add NBA visit');
            }
        },
        // addNHLVisit adds a visited MLB stadium, checks to see if user and/or stadium exists, if both pass then the stadium will be marked as visited along with the date visited
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
                throw new Error('Failed to add NHL visit');
            }
        },
        // editMLBVisit searches for the userId of the user that is updating a visit, and edit the date that they visited
        editMLBVisit: async (parent, { userId, stadiumId, dateVisited }) => {
            try {
                const updateVisit = await User.findOneAndUpdate(
                    { _id: userId, "baseballStadiums.stadiumId": stadiumId },
                    {
                        $set: {
                            "baseballStadiums.$.dateVisited": dateVisited,
                        },
                    },
                    { new: true, upsert: true }
                );
                return updateVisit;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to update MLB visit");
            }
        },
        // editNBAVisit searches for the userId of the user that is updating a visit, and edit the date that they visited
        editNBAVisit: async (parent, { userId, stadiumId, dateVisited }) => {
            try {
                const updateVisit = await User.findOneAndUpdate(
                    { _id: userId, "basketballStadiums.stadiumId": stadiumId },
                    {
                        $set: {
                            "basketballStadiums.$.dateVisited": dateVisited,
                        },
                    },
                    { new: true, upsert: true }
                );
                return updateVisit;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to update NBA visit");
            }
        },
        // editNFLVisit searches for the userId of the user that is updating a visit, and edit the date that they visited
        editNFLVisit: async (parent, { userId, stadiumId, dateVisited }) => {
            try {
                const updateVisit = await User.findOneAndUpdate(
                    { _id: userId, "footballStadiums.stadiumId": stadiumId },
                    {
                        $set: {
                            "footballStadiums.$.dateVisited": dateVisited,
                        },
                    },
                    { new: true, upsert: true }
                );
                return updateVisit;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to update NFL visit");
            }
        },
        // editNHLVisit searches for the userId of the user that is updating a visit, and edit the date that they visited
        editNHLVisit: async (parent, { userId, stadiumId, dateVisited }) => {
            try {
                const updateVisit = await User.findOneAndUpdate(
                    { _id: userId, "hockeyStadiums.stadiumId": stadiumId },
                    {
                        $set: {
                            "hockeyStadiums.$.dateVisited": dateVisited,
                        },
                    },
                    { new: true, upsert: true }
                );
                return updateVisit;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to update NHL visit");
            }
        },
        // deleteMLBVisit will search the userId of the user that is deleting a visit, and delete the visit 
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
        // deleteNFLVisit will search the userId of the user that is deleting a visit, and delete the visit 
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
        // deleteNBAVIsit will search the userId of the user that is deleting a visit, and delete the visit 
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
        // deleteNHLVisit will search the userId of the user that is deleting a visit, and delete the visit 
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