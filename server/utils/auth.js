const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const expiration = '200h';

module.exports = {
    AuthenticationError: new GraphQLError("Incorrect username or password, please try again.", {
        extensions: {
            code: "UNAUTHENTICATED",
        },
    }),

    // Token for when the user signs in
    signToken: function ({ email, firstName, lastName, _id }) {
        const payload = { email, firstName, lastName, _id };
        try {
            // Explicitly define the algorithm you are using
            return jwt.sign({ data: payload }, secret, { expiresIn: expiration, algorithm: 'HS256' });
        } catch (error) {
            console.error("Error signing token:", error);
            throw new GraphQLError("Failed to sign token", {
                extensions: {
                    code: "INTERNAL_SERVER_ERROR",
                },
            });
        }
    },
};
