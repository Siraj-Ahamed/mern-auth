import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        // res.status(500).json(error.message);
        if (error.code === 11000 && error.keyPattern.username) {
            // Duplicate username error
            res.status(400).json({
                error: "Username already exists. Please choose a different username.",
            });
        } else {
            // Other errors
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
