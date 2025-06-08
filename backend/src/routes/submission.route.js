import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getAllSubmissions,
  getAllSubmissionsCountForProblem,
  getSubmissionsForProblem,
} from "../controllers/submission.controller.js";

const submitionRoutes = Router();

submitionRoutes.get("/get-all-submissions", authMiddleware, getAllSubmissions);
submitionRoutes.get(
  "/get-submission/:problemId",
  authMiddleware,
  getSubmissionsForProblem
);
submitionRoutes.get(
  "/get-submissionsCount/:problemId",
  authMiddleware,
  getAllSubmissionsCountForProblem
);

export default submitionRoutes;
