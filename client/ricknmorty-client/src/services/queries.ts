import { gql } from "@apollo/client";

export const GET_CACHED_CHARACTERS = gql`
  query GetCachedCharacters {
    characters {
      id
      name
      status
      species
      gender
      image
      deleted
      starred
      comments
    }
  }
`;

export const WRITE_CHARACTER = gql`
  query WriteCharacters {
    characters {
      id
      name
      status
      species
      gender
      image
      deleted
      starred
      comments
    }
  }
`;

// GraphQL Query for searching characters
export const SEARCH_CHARACTERS = gql`
  query GetCharacter($filter: CharacterFilterInput) {
    charactersByName(filter: $filter) {
      id
      name
      status
      species
      gender
      image
      deleted
      starred
      comments
    }
  }
`;
