import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router();

// "/api/v1/users"
router.post("/", usersController.createUser);
router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);

export const usersRoute = router;
