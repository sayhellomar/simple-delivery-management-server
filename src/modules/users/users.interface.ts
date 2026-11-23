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
}

export type Data = Insert;
