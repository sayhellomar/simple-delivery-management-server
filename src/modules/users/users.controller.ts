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

async function getUsers(req: Request, res: Response) {
    try {
        const result = await usersService.getUsersFromDB();
        sendResponse(
            res,
            200,
            true,
            "Users retrived successfully",
            result.rows,
        );
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

async function getUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await usersService.getUserFromDB(Number(id));
        if (result.rowCount === 0) {
            return sendResponse(res, 404, false, "User not found");
        }
        sendResponse(
            res,
            200,
            true,
            "User retrived successfully",
            result.rows[0],
        );
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await usersService.updateUserToDB(req.body, Number(id));
        if (result.rowCount === 0) {
            return sendResponse(res, 404, false, "User not found");
        }
        sendResponse(
            res,
            200,
            true,
            "Your profile updated successfully",
            result.rows[0],
        );
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await usersService.deleteUserFromDB(Number(id));
        if (result.rowCount === 0) {
            return sendResponse(res, 404, false, "User not found");
        }
        sendResponse(res, 200, true, "User deleted successfully");
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

export const usersController = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
