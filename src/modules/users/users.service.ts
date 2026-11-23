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

async function getUserFromDB() {}

export const usersService = {
    createUserToDB,
};
