import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { User } from "./users.interface";
import jwt, { type JwtPayload } from "jsonwebtoken";

async function createUserToDB(payload: User) {
    const { name, email, password } = payload;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        `
        INSERT INTO users 
            (name, email, password)
        VALUES 
            ($1, $2, $3)
        RETURNING name, email
    `,
        [name, email, hashPassword],
    );

    return result;
}

async function getUsersFromDB() {
    const result = await pool.query(`
        SELECT 
            name, email, role, is_active, created_at, updated_at 
        FROM users
    `);
    return result;
}

async function getUserFromDB(id: number) {
    const result = await pool.query(
        `
        SELECT 
            name, email, role, is_active, created_at, updated_at 
        FROM users
        WHERE id = $1
    `,
        [id],
    );

    return result;
}

async function updateUserToDB(payload: User, token: string, id: number) {
    const { name, email, password, role, is_active } = payload;
    const newPassword = password ? await bcrypt.hash(password, 10) : null;
    const verifyToken = jwt.verify(
        token,
        `${process.env.ACCESS_TOKEN_KEY}`,
    ) as JwtPayload;

    if (verifyToken.role !== "admin" && verifyToken.id !== id) {
        throw new Error("Unauthorized access", {
            cause: { code: 401 },
        });
    }

    const safeEmail = verifyToken.role === "admin" ? email ?? null : null;
    const safeRole = verifyToken.role === "admin" ? role ?? null : null;

    const result = pool.query(
        `
        UPDATE users
        SET
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            password = COALESCE($3, password),
            is_active = COALESCE($4, is_active),
            role = COALESCE($5, role)
        WHERE id = $6
        RETURNING name, email, role, is_active
    `,
        [name ?? null, safeEmail, newPassword, is_active ?? null, safeRole, id],
    );
    return result;
}

async function deleteUserFromDB(id: number) {
    const result = pool.query(
        `
        DELETE FROM users
        WHERE id = $1
    `,
        [id],
    );
    return result;
}

export const usersService = {
    createUserToDB,
    getUsersFromDB,
    getUserFromDB,
    updateUserToDB,
    deleteUserFromDB,
};
