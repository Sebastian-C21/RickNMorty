export interface CardProps {
    id: number;
    name: string;
    species: string;
    gender: string;
    status: string;
    starred: boolean;
    comments: string;
    onToggleStar: () => void;
}
