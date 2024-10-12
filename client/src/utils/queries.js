import { gql } from "@apollo/client"

export const QUERY_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      email
      password
      baseballStadiums {
        _id
        stadiumId
        stadiumName
        teamName
        hasVisited
        dateVisited
      }
      basketballStadiums {
        _id
        stadiumId
        stadiumName
        teamName
        hasVisited
        dateVisited
      }
      footballStadiums {
        _id
        stadiumId
        stadiumName
        teamName
        hasVisited
        dateVisited
      }
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

export const QUERY_MLB = gql `
  query mlbStadiums {
      mlbStadiums {
          _id
          stadiumName
          teamName
          cityName
          division
          stateName
      }
  }
`