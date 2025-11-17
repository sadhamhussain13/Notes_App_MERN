const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const db = require('./db');
const path = require('path');
const cors = require('cors');


const app = express();
// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Adjust according to your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/auth", authRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});