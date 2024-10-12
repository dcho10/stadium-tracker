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