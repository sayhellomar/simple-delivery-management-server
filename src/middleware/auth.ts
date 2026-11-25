import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";
import type { Roles } from "../types";

export default function auth(...roles: Roles[]) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers?.authorization as string;
            if (!token) {
                return sendResponse(res, 401, false, "Unauthorized access");
            }

            const verifyToken = jwt.verify(
                token,
                `${process.env.ACCESS_TOKEN_KEY}`,
            ) as JwtPayload;

            if (!verifyToken) {
                return sendResponse(res, 401, false, "Unauthorized access");
            }

            const user = await pool.query(
                `
                SELECT * FROM users
                WHERE email = $1
            `,
                [verifyToken.email],
            );

            if (user.rowCount === 0) {
                return sendResponse(
                    res,
                    404,
                    false,
                    "No user found in the database",
                );
            }

            if (
                verifyToken.role !== "admin" &&
                verifyToken.id !== Number(req.params.id)
            ) {
                return sendResponse(res, 403, false, "Unauthorized access");
            }

            if (!user.rows[0].is_active) {
                return sendResponse(res, 401, false, "Your account is blocked");
            }

            if (roles.length && !roles.includes(user.rows[0].role)) {
                return sendResponse(res, 401, false, "Unauthorized access");
            }
            // Adding a user to request. As express don't have any type for that we created a type in "./src/types/express/index.d.ts"
            req.user = verifyToken;

            next();
        } catch (error) {
            throw error;
        }
    };
}
