export type Roles = "admin" | "sender" | "rider";

export const USER_ROLES = {
    admin: "admin",
    sender: "sender",
    rider: "rider",
} as const;
