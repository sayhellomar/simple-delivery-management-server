type Role = "admin" | "rider" | "sender";
type Insert = {
    name: string;
    email: string;
};

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

type LoggedInUser = {
    user: Pick<User, "id" | "email" | "role" | "is_active">;
    accessToken: string;
};

export type Data = Insert | User[] | User | LoggedInUser;
