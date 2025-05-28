import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js";

const executionRoutes = Router();

executionRoutes.post("/", authMiddleware, executeCode);

export default executionRoutes;
