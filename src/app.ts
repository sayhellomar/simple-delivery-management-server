import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import { usersController } from "./modules/users/users.controller";
import { usersRoute } from "./modules/users/users.route";
import { profileRoute } from "./modules/profiles/profile.route";
const app: Application = express();

app.use(express.json());

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/profiles", profileRoute);

app.get("/", (req: Request, res: Response) => {
    res.send("Delivery management system server.");
});

export default app;
