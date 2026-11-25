import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import { usersRoute } from "./modules/users/users.route";
import { profileRoute } from "./modules/profiles/profile.route";
import logger from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app: Application = express();

app.use(express.json());
app.use(logger);

app.get("/", (req: Request, res: Response) => {
    res.send("Delivery management system server.");
});

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auth", authRoute);

app.use(globalErrorHandler);

export default app;
