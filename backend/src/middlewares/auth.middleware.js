import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("auth middleware: ", error);
    res.status(500).json({ error: "Error authenticating user" });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!user && user.role !== "ADMIN") {
      return res.status(403).json({
        error: "Access Denied - Admins only",
      });
    }
    next();
  } catch (error) {
    console.error("checkAdmin middleware: ", error);
    res.status(500).json({ error: "Error authenticating admin" });
  }
};

export { authMiddleware, checkAdmin };
