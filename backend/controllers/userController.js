const database=require('../dbConnect');
const asyncHandler=require('express-async-handler');

const getUsers =asyncHandler(async(req, res) => {
    try {
        const loggedInUserId = req.user.id;

        const getUsersQuery = `
            SELECT *
            FROM users
            WHERE id != $1;
        `;

        const values = [loggedInUserId];
        const result = await database.query(getUsersQuery, values);
        const filteredUsers = result.rows;
        res.status(200).json(filteredUsers);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" + error });
    }
});

module.exports = {getUsers};
