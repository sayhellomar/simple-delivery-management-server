import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router();

// "/api/v1/users"
router.post("/", usersController.createUser);

export const usersRoute = router;
