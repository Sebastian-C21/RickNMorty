const { ApolloServer, gql } = require('apollo-server');

//Darle un schema al server

const typeDefs = gql`
    type Character {
        id: Int!
        name: String
        status: String
        species: String
        gender: String
        image: String
        deleted: Boolean
        comments: String
    }
    type Query {
        characters: [Character]
    }
`;

const characters = [
    {
        id : 1,
        name : "Rick Sanchez",
        status : "Alive",
        species : "Human",
        gender : "Male",
        image : "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        deleted: false,
        comments: ''
    },
    {
        id : 2,
        name : "Morty Smith",
        status : "Alive",
        species : "Human",
        type : "",
        gender : "Male",
        image : "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        deleted: false,
        comments: ''
    },
    {
        id : 3,
        name : "Summer Smith",
        status : "Alive",
        species : "Human",
        gender : "Female",
        image : "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        deleted: false,
        comments: ''
    },
    {
        id : 4,
        name : "Beth Smith",
        status : "Alive",
        species : "Human",
        gender : "Female",
        image : "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
        deleted: false,
        comments: ''
    },
    {
        id : 5,
        name : "Jerry Smith",
        status : "Alive",
        species : "Human",
        gender : "Male",
        image : "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
        deleted: false,
        comments: ''
    }
]

const resolvers = {
    Query: {
        characters: () => characters
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then( ({ url }) =>{
    console.log(url)
})