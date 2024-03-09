const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const database = require("../dbConnect");
const authQueries = require("../queries/authQueries");

const register = asyncHandler(async (req, res) => {
    try {
        const { full_name, username, password, confirmPassword, gender } = req.body;

        if (!full_name || !username || !password || !confirmPassword || !gender) res.status(400).json({ error: "All fields are required" });
        if (password.length < 6) res.status(400).json({ error: "Password must be at least 6 characters long" });
        if (password !== confirmPassword) res.status(400).json({ error: "Passwords do not match" });

        const usernameExists = await database.query(authQueries.usernameExists, [username]);
        if (usernameExists.rows.length) res.status(400).json({ error: "Username already exists" });

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

        const newUser = newUserResult.rows[0];

        if (newUser) {
            generateTokenAndSetCookie(newUser.id, res);
            res.status(201).json({ id: newUser.id, full_name: newUser.full_name, username: newUser.username, profile_pic: newUser.profile_pic });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const login = asyncHandler(async (req, res) => {
  try {
      const { username, password } = req.body;
      const usernameExists = await database.query(authQueries.usernameExists, [username]);

      if (!usernameExists.rows.length) {
          res.status(400).json({ error: "Invalid username or password" });
          return;
      }

      const isPasswordCorrect = await bcrypt.compare(password, usernameExists.rows[0].password);

      if (!isPasswordCorrect) {
          res.status(400).json({ error: "Invalid username or password" });
          return;
      }

      const generateTokenAndSetCookie = (id, res) => {
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
              expiresIn: "10d",
          });

          res.cookie("jwt", token, {
              http: true,
              sameSite: "strict"
          });
      };

      generateTokenAndSetCookie(usernameExists.rows[0].id, res);
      res.status(200).json({ message: "User logged in successfully" });

  } catch (error) {
      res.status(500).json({ error: "Internal server error" + error });
  }
});

const logout=async(req,res)=>{
  try {
    res.cookie("jwt", "", {
      http: true,
      sameSite: "strict",
    });
    res.status(200).json({message:"User logged out successfully"});
  } catch (error) {
    res.status(500).json({error:"Internal server error"+error});
  }
}

module.exports = {register, login, logout};
