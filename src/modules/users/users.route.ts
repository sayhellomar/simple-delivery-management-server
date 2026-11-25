import { Router } from "express";
import { usersController } from "./users.controller";
import auth from "../../middleware/auth";
import { USER_ROLES } from "../../types";

const router = Router();

// "/api/v1/users"
router.post("/", usersController.createUser);
router.get("/", auth(USER_ROLES.admin), usersController.getUsers);
router.get(
    "/:id",
    auth(USER_ROLES.admin, USER_ROLES.sender),
    usersController.getUser,
);
router.patch(
    "/:id",
    auth(USER_ROLES.admin, USER_ROLES.sender, USER_ROLES.rider),
    usersController.updateUser,
);
router.delete("/:id", usersController.deleteUser);

export const usersRoute = router;
