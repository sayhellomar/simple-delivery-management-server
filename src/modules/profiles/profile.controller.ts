import type { Request, Response } from "express";
import { profileService } from "./profile.service";
import sendResponse from "../../utils/sendResponse";

async function createProfile(req: Request, res: Response) {
    try {
        const result = await profileService.createProfileToDB(req.body);
        sendResponse(
            res,
            201,
            true,
            "User profile created successfully",
            result.rows[0],
        );
    } catch (error: any) {
        if (error.code === "23505") {
            return sendResponse(res, 409, false, "User profile already exists");
        }
        if (error.code === "23503") {
            return sendResponse(res, 409, false, "User not found");
        }
        sendResponse(res, 500, false, error.message);
    }
}

async function getUsers(req: Request, res: Response) {
    try {
        const result = await profileService.getProfilesFromDB();
        sendResponse(
            res,
            200,
            true,
            "Profiles retrieved successfully",
            result.rows,
        );
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

async function getProfile(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await profileService.getProfileFromDB(Number(id));
        sendResponse(
            res,
            200,
            true,
            "Profile retrieved successfully",
            result.rows,
        );
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

async function updateProfile(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await profileService.updateProfileToDB(
            req.body,
            Number(id),
        );
        if (result.rowCount === 0) {
            return sendResponse(res, 404, false, "No profile found");
        }
        sendResponse(
            res,
            200,
            true,
            "Profile update successfully",
            result.rows[0],
        );
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

async function deleteProfile(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await profileService.deleteProfileFromDB(Number(id));
        if (result.rowCount === 0) {
            return sendResponse(res, 404, false, "No profile found");
        }
        sendResponse(res, 200, true, "Profile deleted successfully");
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

export const profileController = {
    createProfile,
    getUsers,
    getProfile,
    updateProfile,
    deleteProfile,
};
