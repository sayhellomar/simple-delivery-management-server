import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { User } from "./users.interface";

async function createUserToDB(payload: User) {
    const { name, email, password } = payload;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING name, email
    `,
        [name, email, hashPassword],
    );

    return result;
}

async function getUsersFromDB() {
    const result = await pool.query(`
        SELECT name, email, role, is_active, created_at, updated_at FROM users
    `);
    return result;
}

async function getUserFromDB(id: number) {
    const result = await pool.query(
        `
        SELECT name, email, role, is_active, created_at, updated_at FROM users
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
};
