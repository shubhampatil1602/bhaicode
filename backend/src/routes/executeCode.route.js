import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { submitCode, runCode } from "../controllers/executeCode.controller.js";

const executionRoutes = Router();

executionRoutes.post("/run", authMiddleware, runCode);
executionRoutes.post("/submit", authMiddleware, submitCode);

export default executionRoutes;
