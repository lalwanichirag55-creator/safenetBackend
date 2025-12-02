import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import jwt from "jsonwebtoken";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API working!");
});


function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to profile", userId: req.user });
});


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
