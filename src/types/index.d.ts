export interface MyAuthContext {
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}

export interface LoginFormType {
    email?: string;
    password?: string;
}

export interface RegisterFormType {
    full_name?: string;
    email?: string;
    password?: string;
}

export interface CategoryCardProps {
    category: {
        _id: string;
        name: string;
    };
    onDelete?: (id?: string) => void;
}

export interface TrackCardProps {
    track: {
        _id: string;
        title: string;
        lyrics: string;
        image_path: any;
        user_id: any;
    }
    onDelete?: (id?: string) => void;
}

export interface AuthorCardProps {
    author: {
        _id: string;
        name: string;
        image_path: string;
        tracks: any;
    }
    onDelete?: (id?: string) => void;
}

export interface TrackType {
    title: string;
    lyrics: string;
    image: any;
    user_id: any;
}

export interface CategoryType {
    name: string;
}

export interface AuthorType {
    name: string;
    image_path: any;
    tracks: any;
}


export interface DeleteBtnProps {
    resource: string;
    id: string;
    deleteCallback?: (id?: string) => void;
}