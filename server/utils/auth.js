const { GraphQLError } = require("graphql");
const { SignJWT } = require("jose");

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const expiration = '720000000'; 

module.exports = {
    AuthenticationError: new GraphQLError("Incorrect username or password, please try again.", {
        extensions: {
            code: "UNAUTHENTICATED",
        },
    }),

    // Token for when the user signs in
    signToken: async function ({ email, firstName, lastName, _id }) {
        const payload = { email, firstName, lastName, _id };
        try {
            // Sign the token using jose
            const jwt = await new SignJWT({ data: payload })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime(expiration)
                .sign(secret);

            return jwt;
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
