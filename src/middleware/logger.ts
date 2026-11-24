import fs from "fs";
import type { NextFunction, Request, Response } from "express";

export default function logger(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { method, url } = req;
    const logs = `METHOD: ${method} | URL: ${url} | TIME: ${Date.now()}\n`;
    fs.appendFile("logger.txt", logs, (error) => {
        if (error) throw error;
    });
    next();
}
