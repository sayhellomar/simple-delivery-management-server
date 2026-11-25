import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { usersRoute } from "./modules/users/users.route";
import { profileRoute } from "./modules/profiles/profile.route";
import logger from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app: Application = express();
const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200,
};

app.use(express.json());
app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Delivery management system server.");
});

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auth", authRoute);

app.use(globalErrorHandler);

export default app;
