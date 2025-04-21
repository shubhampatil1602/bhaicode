import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";

const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: UserRole.USER,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("error creating user: ", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ error: "User does not exist" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("error logging in user: ", error);
    res.status(500).json({ error: "Error logging in user" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error("error logging out user: ", error);
    res.status(500).json({ error: "Error logging out user" });
  }
};

const check = async (req, res) => {
  try {
    res
      .status(200)
      .json({
        message: "User authenticated successfully",
        success: true,
        user: req.user,
      });
  } catch (error) {
    console.error("error checking user: ", error);
    res.status(500).json({ error: "Error checking user" });
  }
};

export { register, login, logout, check };
