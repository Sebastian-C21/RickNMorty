import { Character } from "./character";

export interface FilterBarProp {
    filterCount:number;
    characters: Character[];
    onGoBack: (arg:boolean) => void;
    onAccepFilter: (arg:boolean) => void;
}

export interface SearchBarProp {
    onSelect: (arg:any) => void;
    onSelectModal: (arg:any) => void;
}