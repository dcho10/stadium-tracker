// Set up import
import { gql } from "@apollo/client"

// Front-end query user
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

// Front-end MLB stadium query
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

// Front-end NBA stadium query
export const QUERY_NBA = gql `
  query nbaStadiums {
    nbaStadiums {
      _id
      stadiumName
      teamName
      division
      cityName
      stateName
    }
  }
`

// Front-end NFL stadium query
export const QUERY_NFL = gql `
  query nflStadiums {
    nflStadiums {
      _id
      stadiumName
      teamName
      cityName
      conference
      division
      stateName
    }
  }
`

// Front-end NHL stadium query
export const QUERY_NHL = gql `
  query nhlStadiums {
    nhlStadiums {
      _id
      stadiumName
      teamName
      division
      cityName
      stateName
    }
  }
`