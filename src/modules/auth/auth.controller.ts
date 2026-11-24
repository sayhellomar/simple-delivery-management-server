import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

async function loginUser(req: Request, res: Response) {
    try {
        const result = await authService.loginUserToDB(req.body);
        sendResponse(res, 200, true, "Logged in successfully", result);
    } catch (error: any) {
        sendResponse(res, error?.cause?.code || 500, false, error.message);
    }
}

export const authController = {
    loginUser,
};
