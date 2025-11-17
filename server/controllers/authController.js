const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const upload = require('../middleware/fileupload');

// User Registration
const register = async (req, res) => {
    try{
        const { username, email, contact, password } = req.body;
        console.log(username, email, contact, password);
        const profile_image = req.file ?`/uploads/${req.file.filename}` : null;
        if(!username || !email || !contact || !password){
            return  res.status(400).json({message:"All user details are required"});
        }
        // check if user already exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE username = ? OR email = ? ", [ username, email ]);
        if(existingUser.length > 0){
            return res.status(409).json({message:"User with the same username or email already exists"});
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // store user data to DB
        const sql = "INSERT INTO users (username, email, contact, password, profile_image) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [username, email, contact||null, hashedPassword, profile_image]);
        res.status(201).json({message:"User registered successfully"});

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [users] = await db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, username]);
        // Check if user exists
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // Check if password is valid
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );
        // console.log("Generated JWT Token:", token);

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set secure flag in production - process.env.NODE_ENV === 'production'
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            // path : '/',
        });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Get current logged-in user
const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const [users] = await db.query("SELECT id, username, email, contact, profile_image FROM users WHERE id = ?", [userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = users[0];
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching current user:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Upload or update profile image
const uploadProfileImage = async (req, res) => {
    try {
        const userId = req.user.userId;
        const profile_image = req.file?`/uploads/${req.file.filename}`: null;
        const[result]=await db.query("UPDATE users SET profile_image = ? WHERE id = ?", [profile_image, userId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Profile image uploaded successfully", profile_image });
    } catch (error) {
        console.error("Error uploading profile image:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// User Logout
const logout = (req, res) => {
    try{
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


module.exports = {register,login, logout, getCurrentUser, uploadProfileImage};