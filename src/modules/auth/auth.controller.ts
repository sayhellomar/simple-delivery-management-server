import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

async function loginUser(req: Request, res: Response) {
    try {
        const result = await authService.loginUserToDB(req.body);
        const { refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            domain: "localhost",
        });
        sendResponse(res, 200, true, "Logged in successfully", result);
    } catch (error: any) {
        sendResponse(res, error?.cause?.code || 500, false, error.message);
    }
}

async function refreshAccessToken(req: Request, res: Response) {
    try {
        const { refreshToken } = req?.cookies;
        const result = await authService.refreshAccessTokenToUser(refreshToken);
        sendResponse(
            res,
            200,
            true,
            "Access token generated successfully",
            result,
        );
    } catch (error: any) {
        sendResponse(res, error?.cause?.code || 500, false, error.message);
    }
}

export const authController = {
    loginUser,
    refreshAccessToken,
};
