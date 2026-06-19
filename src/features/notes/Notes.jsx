import { useEffect, useReducer, useState } from "react";
import {nanoid} from 'nanoid';
import { notesReducer, initialState } from "./notesReducer";
import { getNotes, saveNotes } from "./notesService";
import NotesForm from "./NotesForm";
import NotesCard from "./NotesCard";
import "./notes.css";

const Notes = () => {
  // 1. Reducer state (central state management)
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const { notes } = state;

  // 2. Local UI state (only for editing control)
  const [editingNote, setEditingNote] = useState(null);

  // 3. Load notes from localStorage once when page opens
  useEffect(() => {
    const storedNotes = getNotes();
    dispatch({ type: "SET_NOTES", payload: storedNotes });
  }, []);

  // 4. Save notes to localStorage whenever notes change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // 5. ADD NOTE
  const addNote = (note) => {
    const payload = {
      id: nanoid(),
      ...note,
    };
  
    console.log("Dispatching:", payload);
  
    dispatch({
      type: "ADD_NOTES",
      payload,
    });
  };

  // 6. DELETE NOTE
  const deleteNote = (id) => {
    dispatch({
      type: "DELETE_NOTES",
      payload: id,
    });
  };

  // 7. START EDIT MODE
  const startEdit = (note) => {
    console.log("startEdit called:", note);
    setEditingNote(note);
  };

  // 8. UPDATE NOTE
  const updateNote = (updatedNote) => {
    dispatch({
      type: "UPDATE_NOTES",
      payload: {
        id: updatedNote.id,
        data: updatedNote,
      },
    });

    setEditingNote(null);
  };

  return (
    <div className="notes-container">
      <h2>📝 Notes System</h2>

     {/* FORM */}
     <NotesForm
        key={editingNote ? editingNote.id : "new-note"} 
        addNote={addNote}
        editingNote={editingNote}
        updateNote={updateNote}
      />

      {/* NOTES LIST */}
      <div className="notes-grid">
        {notes.length === 0 ? (
          <p>No notes found. Create your first note ✍️</p>
        ) : (
          notes.map((note) => (
            <NotesCard
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              startEdit={startEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;