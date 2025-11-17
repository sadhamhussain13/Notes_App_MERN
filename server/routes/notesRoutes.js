const express = require('express');
const auth = require('../middleware/auth');
const { createNote, getAllNotes, updateNote, deleteNote } = require('../controllers/notesController');
require('dotenv').config();


const router = express.Router();
router.post('/', auth, createNote);
router.get('/', auth, getAllNotes); 
router.put('/:id', auth, updateNote); 
router.delete('/:id', auth, deleteNote); 

module.exports = router;