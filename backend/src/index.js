import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// routes imports
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
