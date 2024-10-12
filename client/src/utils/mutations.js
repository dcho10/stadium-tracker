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
                stadiumName
                teamName
                hasVisited
                dateVisited
                _id
            }
    }
}
`