// Persistent database
const characters = [
  {
      id : 1,
      name : "Rick Sanchez",
      status : "Alive",
      species : "Human",
      gender : "Male",
      image : "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      deleted: false,
      starred: false,
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
      starred: false,
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
      starred: false,
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
      starred: false,
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
      starred: false,
      comments: ''
    },
    {
      id : 24,
      name : "Armagheadon",
      status : "Alive",
      species : "Alien",
      type : "Cromulon",
      gender : "Male",
      image : "https://rickandmortyapi.com/api/character/avatar/24.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 26,
      name : "Arthricia",
      status : "Alive",
      species : "Alien",
      type : "Cat-Person",
      gender : "Female",
      image : "https://rickandmortyapi.com/api/character/avatar/26.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 29,
      name : "Baby Legs",
      status : "Alive",
      species : "Human",
      type : "Human with baby legs",
      gender : "Male",
      image : "https://rickandmortyapi.com/api/character/avatar/29.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 32,
      name : "Bearded Lady",
      status : "Dead",
      species : "Alien",
      type : "Parasite",
      gender : "Female",
      image : "https://rickandmortyapi.com/api/character/avatar/32.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 34,
      name : "Benjamin",
      status : "Alive",
      species : "Poopybutthole",
      type : "",
      gender : "Male",
      image : "https://rickandmortyapi.com/api/character/avatar/34.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 37,
      name : "Beth Sanchez",
      status : "Alive",
      species : "Human",
      type : "",
      gender : "Female",
      image : "https://rickandmortyapi.com/api/character/avatar/37.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 42,
      name : "Big Head Morty",
      status : "unknown",
      species : "Human",
      type : "Human with giant head",
      gender : "Male",
      image : "https://rickandmortyapi.com/api/character/avatar/42.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 44,
      name : "Body Guard Morty",
      status : "Dead",
      species : "Human",
      type : "",
      gender : "Male",
      image : "https://rickandmortyapi.com/api/character/avatar/44.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 46,
      name : "Bill",
      status : "unknown",
      species : "Animal",
      type : "Dog",
      gender : "Male",
      image : "https://rickandmortyapi.com/api/character/avatar/46.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 60,
      name : "Calypso",
      status : "Dead",
      species : "Human",
      type : "Superhuman",
      gender : "Female",
      image : "https://rickandmortyapi.com/api/character/avatar/60.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 83,
      name : "Cronenberg Morty",
      status : "unknown",
      species : "Cronenberg",
      type : "",
      gender : "Male",
      image : "https://rickandmortyapi.com/api/character/avatar/83.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    },
    {
      id : 91,
      name : "David Letterman",
      status : "Alive",
      species : "Human",
      type : "",
      gender : "Male",
      image : "https://rickandmortyapi.com/api/character/avatar/91.jpeg",
      deleted: false,
      starred: false,
      comments: ''
    }

]

// Utils functions
const findCharacterById = (id) => {
  const character = characters.find((char) => char.id === id && !char.deleted);
  if (!character) throw new Error(`Character with ID ${id} not found or deleted.`);
  return character;
};

const updateCharacter = (id, updates) => {
  const character = findCharacterById(id);
  Object.assign(character, updates); 
  return character;
};

// Resolvers
const characterResolvers = {
  Query: {
    characters: () => characters.filter((char) => !char.deleted),
    charactersByName: (_, { filter }) => {
      const { name } = filter || {};

      // If no filter is provided, return all characters
      if (!name) return characters;

      // Perform case-insensitive filtering by name
      return characters.filter((character) =>
        character.name.toLowerCase().includes(name.toLowerCase())
      );
    },

  },
  Mutation: {
    addComment: (_, { id, comments }) => {
      try {
        return updateCharacter(id, { comments });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteCharacter: (_, { id }) => {
      try {
        return updateCharacter(id, { deleted: true });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    starCharacter: (_, { id }) => {
      try {
        return updateCharacter(id, { starred: true });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = characterResolvers;
