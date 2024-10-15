const typeDefs = `
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        baseballStadiums: [Visit]
        basketballStadiums: [Visit]
        footballStadiums: [Visit]
        hockeyStadiums: [Visit]
    }

    interface Stadium {
        _id: ID
        stadiumName: String
        teamName: String
        division: String
        cityName: String
        stateName: String
    }

    type MLBStadium implements Stadium {
        _id: ID
        stadiumName: String
        teamName: String
        division: String
        cityName: String
        stateName: String   
    }

    type NBAStadium implements Stadium {
        _id: ID
        stadiumName: String
        teamName: String
        division: String
        cityName: String
        stateName: String
    }

    type NHLStadium implements Stadium {
        _id: ID
        stadiumName: String
        teamName: String
        cityName: String
        division: String
        stateName: String
    }

    type NFLStadium implements Stadium {
        _id: ID
        stadiumName: String
        teamName: String
        cityName: String
        conference: String
        division: String
        stateName: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Visit {
        _id: ID
        stadiumId: ID!
        stadiumName: String
        teamName: String
        hasVisited: Boolean
        dateVisited: String
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        mlbStadiums: [MLBStadium]
        nflStadiums: [NFLStadium]
        nbaStadiums: [NBAStadium]
        nhlStadiums: [NHLStadium]
    }

    type Mutation {
        addUser(firstName: String!, lastName: String, email: String!, password: String!): Auth
        
        updateUser(userId: ID!, firstName: String, lastName: String, email: String, password: String): User

        login(email: String!, password: String!): Auth

        addMLBVisit(userId: ID!, stadiumId: ID!, dateVisited: String!): User
        addNFLVisit(userId: ID!, stadiumId: ID!, dateVisited: String!): User
        addNBAVisit(userId: ID!, stadiumId: ID!, dateVisited: String!): User
        addNHLVisit(userId: ID!, stadiumId: ID!, dateVisited: String!): User

        editMLBVisit(userId: ID!, stadiumId: ID!, dateVisited: String!): User
        editNFLVisit(userId: ID!, stadiumId: ID!, dateVisited: String!): User
        editNBAVisit(userId: ID!, stadiumId: ID!, dateVisited: String!): User
        editNHLVisit(userId: ID!, stadiumId: ID!, dateVisited: String!): User

        deleteMLBVisit(userId: ID!, stadiumId: ID!): User
        deleteNFLVisit(userId: ID!, stadiumId: ID!): User
        deleteNBAVisit(userId: ID!, stadiumId: ID!): User
        deleteNHLVisit(userId: ID!, stadiumId: ID!): User
    }
`;

module.exports = typeDefs;