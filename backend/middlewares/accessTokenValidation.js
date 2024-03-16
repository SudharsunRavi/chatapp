const jwt = require("jsonwebtoken");
const database = require("../dbConnect");

const validateAccessToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, "susan");

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        //console.log(decoded);
        const userId = decoded.id;

        const getUserQuery = `
            SELECT * FROM users
            WHERE id = $1;
        `;

        const { rows } = await database.query(getUserQuery, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = {
            id: rows[0].id,
            username: rows[0].username,
        };

        req.user = user;
        res.cookie('jwt', token, { httpOnly: true });
        next();
    } catch (error) {
        console.error("Error in validateAccessToken middleware:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = validateAccessToken;
