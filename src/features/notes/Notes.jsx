import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote, deleteNote, updateNote } from "../../stores/notesSlice";
import { saveNotes } from "./notesService";
import NotesForm from "./NotesForm";
import NotesCard from "./NotesCard";
import "./notes.css";

const Notes = () => {
  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [editingNote, setEditingNote] = useState(null);

  // Sync to localStorage whenever notes change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const handleAdd = (note) => dispatch(addNote(note));

  const handleDelete = (id) => dispatch(deleteNote(id));

  const startEdit = (note) => setEditingNote(note);

  const handleUpdate = (updatedNote) => {
    dispatch(updateNote({ id: updatedNote.id, data: updatedNote }));
    setEditingNote(null);
  };

  return (
    <div className="notes-container">
      <h2>📝 Notes System</h2>

      <NotesForm
        key={editingNote ? editingNote.id : "new-note"}
        addNote={handleAdd}
        editingNote={editingNote}
        updateNote={handleUpdate}
      />

      <div className="notes-grid">
        {notes.length === 0 ? (
          <p>No notes found. Create your first note ✍️</p>
        ) : (
          notes.map((note) => (
            <NotesCard
              key={note.id}
              note={note}
              deleteNote={handleDelete}
              startEdit={startEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
