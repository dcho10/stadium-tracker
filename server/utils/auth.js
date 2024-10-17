const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = 'mysecretssshhhhhhh';
const expiration = '2000h';

module.exports = {
    AuthenticationError: new GraphQLError("Incorrect username or password, please try again.", {
        extensions: {
            code: "UNAUTHENTICATED",
        },
    }),
    signToken: function ({ email, firstName, lastName, _id }) {
        const payload = { email, firstName, lastName, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};