const { gql } = require("apollo-server");

const characterSchema = gql`
  type Character {
    id: Int!
    name: String
    status: String
    species: String
    gender: String
    image: String
    deleted: Boolean
    starred: Boolean
    comments: String
  }

  type Query {
    characters: [Character]
  }

  type Query {
    charactersByName(filter: CharacterFilterInput): [Character]!
  }

  input CharacterFilterInput {
    id: Int
    name: String
    status: String
    species: String
    gender: String
    image: String
    deleted: Boolean
    starred: Boolean
    comments: String
  }

  type Mutation {
    addComment(id: Int!, comments: String!): Character
    deleteCharacter(id: Int!): Character
    starCharacter(id: Int!): Character
  }
`;

module.exports = characterSchema;
