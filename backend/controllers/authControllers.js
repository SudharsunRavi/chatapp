const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const database = require("../dbConnect");
const authQueries = require("../queries/authQueries");


const generateTokenAndSetCookie = (id, res) => {
    const token = jwt.sign({ id }, "susan", {
        expiresIn: "10d",
    });

    //console.log("Generated token:", token);

    let cookieOptions = {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: "strict", 
        secure: false, 
    };

    res.cookie("jwt", token, cookieOptions);
};

const register = asyncHandler(async (req, res) => {
    try {
        const { full_name, username, password, confirmPassword, gender } = req.body;

        if (!full_name || !username || !password || !confirmPassword || !gender) {
            console.log("Invalid user data: All fields are required");
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password.length < 6) {
            console.log("Invalid user data: Password must be at least 6 characters long");
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        if (password !== confirmPassword) {
            console.log("Invalid user data: Passwords do not match");
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const usernameExists = await database.query(authQueries.usernameExists, [username]);

        if (usernameExists.rows.length) {
            console.log("Username already exists:", username);
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const profile_pic = gender === "male" ? boyProfilePic : girlProfilePic;

        const newUserResult = await database.query(authQueries.registerUser, [
            full_name,
            username,
            hashedPassword,
            gender,
            profile_pic,
        ]);

        if (newUserResult.rowCount === 1) {
            const newUser = {
                id: newUserResult.rows[0]?.id,
                full_name,
                username,
                profile_pic,
            };

            generateTokenAndSetCookie(newUser.id, res);
            return res.status(201).json(newUser);
        } else {
            return res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

const login = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;
        const usernameExists = await database.query(authQueries.usernameExists, [username]);

        if (!usernameExists.rows.length) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, usernameExists.rows[0].password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const userId = usernameExists.rows[0].id;

        const token = jwt.sign({ userId }, "susan", { expiresIn: "10d" });
        generateTokenAndSetCookie(userId, res);
        return res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
        });
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { register, login, logout };
