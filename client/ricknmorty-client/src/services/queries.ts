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

// GraphQL mutation to perform changes
export const STAR_CHARACTER = gql`
  mutation StarCharacter($starCharacterId: Int!) {
  starCharacter(id: $starCharacterId) {
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

// GraphQL mutation to add a comment
export const ADD_COMMENT = gql`
  mutation Mutation($addCommentId: Int!, $comments: String!) {
  addComment(id: $addCommentId, comments: $comments) {
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

// GraphQL mutation to add a comment
export const DELETE_CARD = gql`
  mutation DeleteCharacter($deleteCharacterId: Int!) {
  deleteCharacter(id: $deleteCharacterId) {
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
