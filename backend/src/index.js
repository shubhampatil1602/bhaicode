import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// routes imports
import authRoutes from "./routes/auth.route.js";
import problemRoutes from "./routes/problem.route.js";
import executionRoutes from "./routes/executeCode.route.js";
import submitionRoutes from "./routes/submission.route.js";

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executionRoutes);
app.use("/api/v1/submission", submitionRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
