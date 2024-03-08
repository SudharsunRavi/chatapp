const usernameExists = "SELECT * FROM users WHERE username=$1";
const registerUser = "INSERT INTO users (full_name, username, password, gender, profile_pic) VALUES ($1, $2, $3, $4, $5);";

module.exports={usernameExists, registerUser};