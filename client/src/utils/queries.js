import { gql } from "@apollo/client"

export const QUERY_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            firstName
            lastName
            email
            baseballStadiums {
                _id
                stadiumName
                teamName
                cityName
                stateName
                hasVisited
                dateVisited
            }
            basketballStadiums {
                _id
                stadiumName
                teamName
                cityName
                stateName
                hasVisited
                dateVisited
            }
            footballStadiums {
                _id
                stadiumName
                teamName
                cityName
                stateName
                hasVisited
                dateVisited
            }
            hockeyStadiums {
                _id
                stadiumName
                teamName
                cityName
                stateName
                hasVisited
                dateVisited
            }
        }
    }
`