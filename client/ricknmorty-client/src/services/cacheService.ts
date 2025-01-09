import { GET_CACHED_CHARACTERS, WRITE_CHARACTER } from "./queries";
import { gql } from "@apollo/client";
import { Character } from "../types";

// Function to read cached data
export const getCachedData = (client:any) => {
  try {
    const data = client.readQuery({
      query: GET_CACHED_CHARACTERS,
    });
    console.log("Cached Data:", data?.characters);
    if (data) {
        return data.characters;
    }else{
        return [];
    }
  } catch (error: any) {
    console.error("Error reading cache:", error.message);
  }
};

// Function to add a new character to the cache
export const addCharacterToCache = (client:any,newCharacter: Character) => {
  try {
    // Read existing cache
    const existingData = client.readQuery({
      query: GET_CACHED_CHARACTERS,
    });

    const isDuplicate = existingData?.characters.some(
      (character: Character) => character.id === newCharacter.id
    );

    if (isDuplicate) {
      return;
    }

    // Write new data to the cache
    client.writeQuery({
      query: WRITE_CHARACTER,
      data: {
        characters: [...(existingData?.characters || []), newCharacter],
      },
    });

    console.log("Character added to cache!");
  } catch (error: any) {
    console.error("Error writing to cache:", error.message);
  }
};

// Function to update the 'starred' property of a character in the cache
export const updateStarred = (client:any, id: number, newStarred: boolean) => {
  client.cache.modify({
    fields: {
      characters(existingCharacters = [], { readField }:any) {
        return existingCharacters.map((characterRef: any) => {
          if (readField("id", characterRef) === id) {
            client.cache.writeFragment({
              id: `Character:${readField("id", characterRef)}`,
              fragment: gql`
                fragment UpdateStarred on Character {
                  id
                  starred
                }
              `,
              data: {
                id: id,
                starred: newStarred,
              },
            });
            return characterRef;
          }
          return characterRef;
        });
      },
    },
  });
};

// Function to update the 'comment' property of a character in the cache
export const updateComment = (client:any,id:number,comment:string) => {
    client.cache.modify({
      fields: {
        characters(existingCharacters = [], { readField }:any) {
          return existingCharacters.map((characterRef:any) => {
            if (readField("id", characterRef) === id) {
              client.cache.writeFragment({
                id: `Character:${readField("id", characterRef)}`,
                fragment: gql`
                  fragment UpdateComment on Character {
                    id
                    comments
                  }
                `,
                data: {
                  id: id,
                  comments: comment, 
                },
              });
              return characterRef;
            }
            return characterRef;
          });
        },
      },
    });
  };
