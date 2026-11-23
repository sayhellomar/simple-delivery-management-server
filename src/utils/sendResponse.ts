import type { Response } from "express";
import type { Data } from "../modules/users/users.interface";

export default function sendResponse(
    res: Response,
    stausCode: number,
    success: boolean,
    message: string,
    data?: Data,
) {
    const response = {
        success,
        message,
        data,
    };
    res.status(stausCode).json(response);
}
