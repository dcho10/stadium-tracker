const typeDefs = `
    type User {
        _id: ID
        firstName: String
        lastName: String
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
        addUser(firstName: String!, lastName: String, email: String!, password: String!): Auth
        
        updateUser(userId: ID!, firstName: String, lastName: String, email: String, password: String): User

        login(email: String!, password: String!): Auth

        addVisit(userId: ID!, stadiumLeague: String, stadiumId: ID!, dateVisited: String!): User

        deleteVisit(userId: ID!, stadiumLeague: String, stadiumId: ID!): User
    }
`;

module.exports = typeDefs;