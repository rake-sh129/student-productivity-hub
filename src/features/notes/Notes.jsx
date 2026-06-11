import { useEffect, useReducer, useState } from "react";
import { notesReducer, initialState } from "./notesReducer";
import { getNotes, saveNotes } from "./notesService";
import { nanoid } from "nanoid";
import NotesCard from "./NotesCard";
import NotesForm from "./NotesForm";
import "./notes.css";

const Notes = () => {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const { notes } = state;

  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const storedNotes = getNotes();
    dispatch({
      type: "SET_NOTES",
      payload: storedNotes,
    });
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = (note) => {
    dispatch({
      type: "ADD_NOTES",
      payload: {
        id: nanoid(),
        ...note,
      },
    });
  };

  const deleteNote = (id) => {
    dispatch({
      type: "DELETE_NOTES",
      payload: id,
    });
  };

  const startEdit = (note) => {
    setEditingNote(note);
  };

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
    <div className="notes-page-wrapper">
      <div className="aurora-orb orb-1"></div>
      <div className="aurora-orb orb-2"></div>
      <div className="aurora-orb orb-3"></div>

      <div className="notes-container">
        <div className="notes-header">
          <h1 className="gradient-title">Notes</h1>

          <p className="subtitle">
            Capture ideas, organize thoughts, stay productive
          </p>
        </div>

        <div className="add-note-wrapper">
          <NotesForm
            addNote={addNote}
            editingNote={editingNote}
            updateNote={updateNote}
          />
        </div>

        <div className="notes-grid">
          {notes.length === 0 ? (
            <p className="subtitle">
              No notes found. Create your first note ✍️
            </p>
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
    </div>
  );
};

export default Notes;