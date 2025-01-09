export interface PopupProps {
    visible: boolean;
    onClose: () => void;
    onCreateComment: (arg:string) => void;
}