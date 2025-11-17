import React, { useEffect, useState } from "react";
import axios from "axios";

export const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [note, setNote] = useState("")
  const [editingNoteId, setEditingNoteId] = useState(null)

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes", {
        withCredentials: true,
      });
      setNotes(response.data.notes);
      console.log(response);
      // console.log("API DATA:", response.data);

    } catch (err) {
      setError("Failed to Fetch Notes: " + err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateOrUpdateNote = async () => {
  try {
    if (editingNoteId) {
      // Update existing note
      await axios.put(
        `http://localhost:5000/api/notes/${editingNoteId}`,
        { note },
        { withCredentials: true }
      );
      setEditingNoteId(null);
    } else {
      // Create new note
      await axios.post(
        "http://localhost:5000/api/notes",
        { note },
        { withCredentials: true }
      );
    }

    // Common actions for both create and update
    setNote("");           // Clear the textarea
    await fetchNotes();    // Refresh notes list
    setError("");         // Clear any errors

  } catch (err) {
    setError("Failed to save note: " + err.message);
    console.error("Save error:", err);
  }
};

  const handleEditeNote = (note) => {
    setNote(note.note);
    setEditingNoteId(note.note_id)
  }

  const handleDeleteNote = async (id) => {
    try{
      if(confirm("Are you sure want to delete?")){
        await axios.delete(`http://localhost:5000/api/notes/${id}`,{withCredentials:true})
      fetchNotes()
      }
    } catch (err){
      setError("Faile to delete note" + err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4 sm:px-6 lg:px-10 flex justify-center">
      <div className="w-full max-w-4xl">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
          My Notes
        </h2>

        {/* Error */}
        <p className="text-sm text-red-500 mb-4 h-5">{error}</p>

        {/* Create Note Box */}
        <div className="bg-white p-4 shadow-lg rounded-lg mb-8">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 resize-none"
            rows="4"
            value={note} onChange={(e)=>setNote(e.target.value)}
            placeholder="Type your new note here..."
          ></textarea>

          <button 
          onClick={handleCreateOrUpdateNote}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition duration-300 ease-in-out">
            {editingNoteId?"Update Note":"Create Note"}
          </button>
        </div>

        {/* Notes List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          
          {/* Placeholder Card */}
          {notes.length === 0 && (
            <div className="note-card bg-gray-200 h-32 rounded-lg p-4 flex items-center justify-center text-gray-500 italic">
              ... More notes will go here ...
            </div>
          )}

          {/* Actual Notes */}
          {notes.length > 0 &&
            notes.map((note) => (
              <div
                key={note.note_id}
                className="bg-white p-5 shadow-xl rounded-lg border border-gray-200 flex flex-col justify-between transition transform hover:scale-[1.02] duration-300"
              >
                {/* Note Text */}
                <p className="note-text text-gray-700 mb-4 text-base overflow-hidden line-clamp-4">
                  {note.note}
                </p>

                {/* Note Date */}
                <p className="note-date text-sm text-gray-500 border-t pt-3 mt-auto font-bold">
  {note.date 
    ? new Date(note.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : "No Date"}
</p>

                {/* Actions */}
                <div className="note-actions flex justify-end space-x-3 mt-4">
                  <button 
                  onClick={()=>handleEditeNote(note)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                    Edit
                  </button>

                  <button 
                  onClick={()=>handleDeleteNote(note.note_id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
