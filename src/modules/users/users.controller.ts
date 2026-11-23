import type { Request, Response } from "express";
import { usersService } from "./users.service";
import sendResponse from "../../utils/sendResponse";

async function createUser(req: Request, res: Response) {
    try {
        const result = await usersService.createUserToDB(req.body);
        sendResponse(
            res,
            201,
            true,
            "User created successfully",
            result.rows[0],
        );
    } catch (error: any) {
        if (error.code === "23505") {
            return sendResponse(
                res,
                409,
                false,
                "Email already exists. Please try a new one",
            );
        }
        sendResponse(res, 500, false, error.message);
    }
}

export const usersController = {
    createUser,
};
