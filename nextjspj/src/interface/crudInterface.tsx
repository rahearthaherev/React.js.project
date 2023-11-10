
export interface HeaderProps {
    title: string;
    onChangeMode: () => void;
}
export interface NavProps {
    id: number;
    title: string;
    body: string;
}
export interface CreateProps {
    onCreate: (title: string, body: string) => void;
    onCancel: () => void;
}
export interface UpdateProps {
    title: string;
    body: string;
    onUpdate: (title: string, body: string) => void;
    onCancel: () => void;
}
