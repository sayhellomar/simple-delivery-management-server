import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { User } from "./users.interface";

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

async function updateUserToDB(payload: User, id: number) {
    const { name, password, is_active } = payload;
    const hashPassword = await bcrypt.hash(password, 10);

    const result = pool.query(
        `
        UPDATE users
        SET
            name = COALESCE($1, name),
            password = COALESCE($2, password),
            is_active = COALESCE($3, is_active)
        WHERE id = $4
        RETURNING name, email, role, is_active
    `,
        [name ?? null, hashPassword ?? null, is_active ?? null, id],
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
