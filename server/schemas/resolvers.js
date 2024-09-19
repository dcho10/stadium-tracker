const { User } = require("../models");
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
        addUser: async (parent, {userName, email, password }) => {
            const user = await User.create({ userName, email, password });
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
        }
    }
}

module.exports = resolvers;