const typeDefs = `
    type User {
        _id: ID
        userName: String
        email: String
        password: String
        baseballStadiums: [MLBStadium]
        basketballStadiums: [NBAStadium]
        footballStadiums: [NFLStadium]
        hockeyStadiums: [NHLStadium]
    }

    interface Stadium {
        _id: ID
        stadiumName: String
        teamName: String
        cityName: String
        stateName: String
        hasVisited: Boolean
        dateVisited: String
    }

    type MLBStadium implements Stadium {
        _id: ID
        stadiumName: String
        teamName: String
        cityName: String
        stateName: String
        hasVisited: Boolean
        dateVisited: String    
    }

    type NBAStadium implements Stadium {
        _id: ID
        stadiumName: String
        teamName: String
        cityName: String
        stateName: String
        hasVisited: Boolean
        dateVisited: String
    }

    type NHLStadium implements Stadium {
        _id: ID
        stadiumName: String
        teamName: String
        cityName: String
        stateName: String
        hasVisited: Boolean
        dateVisited: String
    }

    type NFLStadium implements Stadium {
        _id: ID
        stadiumName: String
        teamName: String
        cityName: String
        stateName: String
        hasVisited: Boolean
        dateVisited: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        me: User
    }

    type Mutation {
        addUser(userName: String!, email: String!, password: String!): Auth

        updateUser(userId: ID!, userName: String, email: String, password: String): User

        login(email: String!, password: String!): Auth

        visitMLBStadium(userId: ID!, stadiumId: ID!): User
        visitNBAStadium(userId: ID!, stadiumId: ID!): User
        visitNHLStadium(userId: ID!, stadiumId: ID!): User
        visitNFLStadium(userId: ID!, stadiumId: ID!): User
    }
`;

module.exports = typeDefs;