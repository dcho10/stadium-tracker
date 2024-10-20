const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = 'mysecretssshhhhhhh';
const expiration = '200h';

module.exports = {
    AuthenticationError: new GraphQLError("Incorrect username or password, please try again.", {
        extensions: {
            code: "UNAUTHENTICATED",
        },
    }),
    // Token for when the user signs in (found in payload) - token will contain email, first name, last name and user, and includes expiration time
    signToken: function ({ email, firstName, lastName, _id }) {
        const payload = { email, firstName, lastName, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};