import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import jwt from "jsonwebtoken";
import incidentRoutes from "./routes/incidentRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);

app.get("/", (req, res) => {
  res.send("API working!");
});

app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to profile", userId: req.user });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
