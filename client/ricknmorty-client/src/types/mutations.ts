import { Character } from './character';

export interface AddCommentVariables {
  id: number;
  comments: string;
}

export interface AddCommentResponse {
  addComment: Character; // Returns a Character object
}

export interface DeleteCharacterVariables {
  id: number;
}

export interface DeleteCharacterResponse {
  deleteCharacter: boolean; // Returns a Boolean
}

export interface StarCharacterVariables {
  id: number;
}

export interface StarCharacterResponse {
  starCharacter: boolean; // Returns a Boolean
}
