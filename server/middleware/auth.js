const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // Check token in cookies OR Authorization header
    const token =
        req.cookies?.token ||
        (req.header("Authorization")?.startsWith("Bearer ")
            ? req.header("Authorization").split(" ")[1]
            : null);

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. Please login to access." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID/data to request object
        req.user = decoded;

        return next();
    } catch (err) {
        console.error("JWT ERROR:", err.message);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = auth;
