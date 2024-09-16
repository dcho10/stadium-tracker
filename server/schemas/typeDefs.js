const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        visitedMLBStadiums: [MLBStadium]
        visitedNBAStadiums: [NBAStadium]
        visitedNHLStadiums: [NHLStadium]
        visitedNFLStadiums: [NFLStadium]
        stadiumCount: Int

    }

    interface Stadium {
        _id: ID
        name: String
        city: String
        state: String
    }

    type MLBStadium implements Stadium {
        _id: ID
        name: String
        team: String
        city: String
        state: String
    }

    type NBAStadium implements Stadium {
        _id: ID
        name: String
        team: String
        city: String
        state: String
    }

    type NHLStadium implements Stadium {
        _id: ID
        name: String
        team: String
        city: String
        state: String
    }

    type NFLStadium implements Stadium {
        _id: ID
        name: String
        team: String
        city: String
        state: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        stadium(id: ID!): Stadium
        mlbStadiums: [MLBStadium]
        nbaStadiums: [NBAStadium]
        nhlStadiums: [NHLStadium]
        nflStadiums: [NFLStadium]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(userId: ID!, username: String, email: String, password: String): User
        login(email: String!, password: String!): Auth
        visitMLBStadium(userId: ID!, stadiumId: ID!): User
        visitNBAStadium(userId: ID!, stadiumId: ID!): User
        visitNHLStadium(userId: ID!, stadiumId: ID!): User
        visitNFLStadium(userId: ID!, stadiumId: ID!): User
    }
`;

module.exports = typeDefs;