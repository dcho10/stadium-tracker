import { gql } from "@apollo/client";

export const ADD_USER = gql`
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

export const ADD_NHL_VISIT = gql `
    mutation addNHLVisit($userId: ID!, $stadiumId: ID!, $dateVisited: String!) {
        addNHLVisit(userId: $userId, stadiumId: $stadiumId, dateVisited: $dateVisited) {
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