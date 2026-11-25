import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";

export default function globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.error(err.stack);
    sendResponse(res, 500, false, err.message || "Internal server error");
}
