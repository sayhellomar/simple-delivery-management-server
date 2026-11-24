import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

// "/api/v1/profiles"
router.post("/", profileController.createProfile);
router.get("/", profileController.getUsers);
router.get("/:id", profileController.getProfile);
router.patch("/:id", profileController.updateProfile);
router.delete("/:id", profileController.deleteProfile);

export const profileRoute = router;
