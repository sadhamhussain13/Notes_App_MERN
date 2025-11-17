const db = require('../db');
const { get } = require('../routes/notesRoutes');

// Create a new note
const createNote = async (req, res) => {
    try {
        const { note } = req.body;
        const userId = req.user.userId;
        const date = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format

        if (!note) {
            return res.status(400).json({ message: "Note content is required" });
        }
        const sql = "INSERT INTO notes (user_id, note, date) VALUES (?, ?, ?)";
        const[result] = await db.query(sql, [userId, note, date]);
        res.status(201).json({ message: "Note created successfully", note_id: result.insertId });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get all notes for the authenticated user
const getAllNotes = async (req, res) => {
    try {
        const userId = req.user.userId;
        const sql = "SELECT * FROM notes WHERE user_id = ?";
        const [notes] = await db.query(sql, [userId]);
        res.status(200).json({ notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const { note } = req.body;
        const userId = req.user.userId;
        const note_id = req.params.id;
        if (!note_id || !note) {
            return res.status(400).json({ message: "Note ID and content are required" });
        }
        const sql = "UPDATE notes SET note = ? WHERE user_id = ? and note_id = ?";
        const [result] = await db.query(sql, [note, userId, note_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Note not found or you do not have permission to update it" });
        }
        res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const userId = req.user.userId;
        const note_id = req.params.id;
        if (!note_id) {
            return res.status(400).json({ message: "Note ID is required" });
        }
        const sql = "DELETE FROM notes WHERE user_id = ? and note_id = ?";
        const [result] = await db.query(sql, [userId, note_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Note not found or you do not have permission to delete it" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { createNote, getAllNotes, updateNote, deleteNote };