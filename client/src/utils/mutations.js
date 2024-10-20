// Set up import
import { gql } from "@apollo/client";

// Add user front-end mutation
export const ADD_USER = gql `
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password)
        {
            token
            user {
                _id
                firstName
                lastName
                email
            }
        }
    }
`;

// Login front-end mutation
export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                firstName
                lastName
            }
        }
    }
`

// Add MLB visit front-end mutation
export const ADD_MLB_VISIT = gql`
    mutation addMLBVisit($userId: ID!, $stadiumId: ID!, $dateVisited: String!) {
        addMLBVisit(userId: $userId, stadiumId: $stadiumId, dateVisited: $dateVisited) {
            _id
            firstName
            lastName
            baseballStadiums {
                _id
                stadiumName
                teamName
                hasVisited
                dateVisited
            }
        }
    }
`

// Add NBA visit front-end mutation
export const ADD_NBA_VISIT = gql `
    mutation addNBAVisit($userId: ID!, $stadiumId: ID!, $dateVisited: String!) {
        addNBAVisit(userId: $userId, stadiumId: $stadiumId, dateVisited: $dateVisited) {
            _id
            firstName
            lastName
            basketballStadiums {
                _id
                stadiumName
                teamName
                hasVisited
                dateVisited
            }
        }
    }
`

// Add NFL visit front-end mutation
export const ADD_NFL_VISIT = gql `
    mutation addNFLVisit($userId: ID!, $stadiumId: ID!, $dateVisited: String!) {
        addNFLVisit(userId: $userId, stadiumId: $stadiumId, dateVisited: $dateVisited) {
            _id
            firstName
            lastName
            footballStadiums {
                _id
                stadiumName
                teamName
                hasVisited
                dateVisited
            }
        }
    }
`

// Add NHL visit front-end mutation
export const ADD_NHL_VISIT = gql `
    mutation addNHLVisit($userId: ID!, $stadiumId: ID!, $dateVisited: String!) {
        addNHLVisit(userId: $userId, stadiumId: $stadiumId, dateVisited: $dateVisited) {
            _id
            firstName
            lastName
            hockeyStadiums {
                _id
                stadiumName
                teamName
                hasVisited
                dateVisited
            }
        }
    }
`

// Edit MLB visit front-end mutation
export const EDIT_MLB_VISIT = gql `
    mutation editMLBVisit($userId: ID!, $stadiumId: ID!, $dateVisited: String!) {
        editMLBVisit(userId: $userId, stadiumId: $stadiumId, dateVisited: $dateVisited) {
            firstName
            lastName
            baseballStadiums {
                _id
                stadiumId
                stadiumName
                teamName
                hasVisited
                dateVisited
            }
        }
    }
`
// Edit NBA visit front-end mutation
export const EDIT_NBA_VISIT = gql `
    mutation editNBAVisit($userId: ID!, $stadiumId: ID!, $dateVisited: String!) {
        editNBAVisit(userId: $userId, stadiumId: $stadiumId, dateVisited: $dateVisited) {
        firstName
        lastName
        basketballStadiums {
            _id
            stadiumId
            stadiumName
            teamName
            hasVisited
            dateVisited
        }
        }
    }  
`

// Edit NFL visit front-end mutation
export const EDIT_NFL_VISIT = gql `
    mutation editNFLVisit($userId: ID!, $stadiumId: ID!, $dateVisited: String!) {
        editNFLVisit(userId: $userId, stadiumId: $stadiumId, dateVisited: $dateVisited) {
            footballStadiums {
            _id
            stadiumId
            stadiumName
            teamName
            hasVisited
            dateVisited
            }
        }
    }
`
// Edit NHL visit front-end mutation
export const EDIT_NHL_VISIT = gql `
    mutation editNHLVisit($userId: ID!, $stadiumId: ID!, $dateVisited: String!) {
        editNHLVisit(userId: $userId, stadiumId: $stadiumId, dateVisited: $dateVisited) {
            firstName
            lastName
            hockeyStadiums {
                _id
                stadiumId
                stadiumName
                teamName
                hasVisited
                dateVisited
            }
        }
    }
`
// Delete MLB visit front-end mutation
export const DELETE_MLB_VISIT = gql `
    mutation deleteMLBVisit($userId: ID!, $stadiumId: ID!) {
        deleteMLBVisit(userId: $userId, stadiumId: $stadiumId) {
            firstName
            lastName
            baseballStadiums {
                _id
                stadiumId
                stadiumName
                teamName
                hasVisited
                dateVisited
            }
        }
    }
`

// Delete NBA visit front-end mutation
export const DELETE_NBA_VISIT = gql `
    mutation deleteNBAVisit($userId: ID!, $stadiumId: ID!) {
        deleteNBAVisit(userId: $userId, stadiumId: $stadiumId) {
            firstName
            lastName
            baseballStadiums {
                _id
                stadiumId
                stadiumName
                teamName
                hasVisited
                dateVisited
            }
        }
    }
`

// Delete NHL visit front-end mutation
export const DELETE_NHL_VISIT = gql `
    mutation deleteNHLVisit($userId: ID!, $stadiumId: ID!) {
        deleteNHLVisit(userId: $userId, stadiumId: $stadiumId) {
            firstName
            lastName
            hockeyStadiums {
                _id
                stadiumId
                stadiumName
                teamName
                hasVisited
                dateVisited
            }
        }
    }
`

// Delete NFL visit front-end mutation
export const DELETE_NFL_VISIT = gql `
    mutation deleteNFLVisit($userId: ID!, $stadiumId: ID!) {
        deleteNFLVisit(userId: $userId, stadiumId: $stadiumId) {
            firstName
            lastName
            footballStadiums {
                _id
                stadiumId
                stadiumName
                teamName
                hasVisited
                dateVisited
            }
        }
    }
`