import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { LoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";

async function loginUserToDB(payload: LoginUser) {
    const { email, password } = payload;
    const user = await pool.query(
        `
        SELECT id, email, password, role, is_active FROM users
        WHERE email = $1
    `,
        [email],
    );
    if (user.rowCount === 0) {
        throw new Error("User not found", {
            cause: { code: 404 },
        });
    }

    const isPasswordMatch = await bcrypt.compare(
        password,
        user.rows[0].password,
    );

    if (!isPasswordMatch) {
        throw new Error("Credentials are incorrect", {
            cause: { code: 401 },
        });
    }

    if (!user.rows[0].is_active) {
        throw new Error("Your account is blocked", {
            cause: { code: 401 },
        });
    }

    delete user.rows[0].password;

    const loginPayload = {
        id: user.rows[0].id,
        email: user.rows[0].email,
        role: user.rows[0].role,
        is_active: user.rows[0].is_active,
    };

    const accessToken = jwt.sign(
        loginPayload,
        `${process.env.ACCESS_TOKEN_KEY}`,
        { expiresIn: "1h" },
    );

    // console.log(loginPayload, `${process.env.ACCESS_TOKEN_KEY}`);

    return {
        user: user.rows[0],
        accessToken,
    };
}

export const authService = {
    loginUserToDB,
};
