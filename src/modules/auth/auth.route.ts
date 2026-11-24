import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// "/api/v1/auth"
router.post("/login", authController.loginUser);

export const authRoute = router;
