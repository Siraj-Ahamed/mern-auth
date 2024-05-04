import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
