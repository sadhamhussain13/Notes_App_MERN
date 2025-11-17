const express = require('express');
require('dotenv').config();
const { register, login, logout, getCurrentUser, uploadProfileImage } = require('../controllers/authController');
const upload = require('../middleware/fileupload');
const auth = require('../middleware/auth');
const router = express.Router();

router.post("/register",upload.single("profile_image"),register)
router.post("/login",login);
router.get("/me",auth,getCurrentUser);
router.post("/upload-profile-image",auth,upload.single("profile_image"),uploadProfileImage);
router.post("/logout",logout);

module.exports = router;