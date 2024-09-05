const { User, MLBStadium, NBAStadium, NHLStadium, NFLStadium } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
        user: async (parent, { username }) => {
            return User.findOne()({ username });
        },
        mlbStadiums: async () => {
            return MLBStadium.find();
        },
        nbaStadiums: async () => {
            return NBAStadium.find();
        },
        nflStadiums: async () => {
            return NFLStadium.find();
        },
        nhlStadiums: async () => {
            return NHLStadium.find();
        }
    },

    Mutation: {
        addUser: async (parent, {username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError
            }

            const correctPass = await user.isCorrectPassword(password);

            if (!correctPass) {
                throw AuthenticationError
            }

            const token = signToken(user);

            return { token, user};
        },
        visitMLBStadium: async (parent, { userId, stadiumId }) => {
            const stadium = await MLBStadium.findById(stadiumId);

            if (!stadium) {
                throw new Error("Stadium not found"); 
            }

            const user = await User.findById(userId);

            if (user.visitedMLBStadiums.includes(stadiumId)) {
                throw new Error("Stadium already visited");
            }

            user.visitedMLBStadiums.push(stadiumId);
            user.stadiumCount = user.stadiumCount + 1;
            await user.save();

            return user;
        },
        visitedNBAStadium: async (parent, { userId, stadiumId }) => {
            const stadium = await NBAStadium.findById(stadiumId);

            if (!stadium) {
                throw new Error("Stadium not found");
            }

            const user = await User.findById(userId);

            if (user.visitedNBAStadiums.includes(stadiumId)) {
                throw new Error("Stadium already visited");
            }

            user.visitedNBAStadiums.push(stadiumId);
            user.stadiumCount = user.stadiumCount + 1;
            await user.save();

            return user;
        },
        visitedNHLStadium: async (parent, { userId, stadiumId }) => {
            const stadium = await NHLStadium.findById(stadiumId);

            if (!stadium) {
                throw new Error("Stadium not found");
            }

            const user = await User.findById(userId);

            if (user.visitedNHLStadiums.includes(stadiumId)) {
                throw new Error("Stadium already visited");
            }

            user.visitedNHLStadiums.push(stadiumId);
            user.stadiumCount = user.stadiumCount + 1;
            await user.save();

            return user;
        },
        visitedNFLStadium: async (parent, { userId, stadiumId }) => {
            const stadium = await NFLStadium.findById(stadiumId);

            if (!stadium) {
                throw new Error("Stadium not found");
            }

            const user = await User.findById(userId);

            if (user.visitedNFLStadiums.includes(stadiumId)) {
                throw new Error("Stadium already visited");
            }

            user.visitedNFLStadiums.push(stadiumId);
            user.stadiumCount = user.stadiumCount + 1;
            await user.save();

            return user;
        }
    }
}