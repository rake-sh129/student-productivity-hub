import { useEffect, useReducer, useState } from "react"
import { notesReducer,initialState } from "./notesReducer"
import { getNotes, saveNotes } from "./notesService"
import { nanoid } from "nanoid";
import NotesCard from "./NotesCard";
import NotesForm from "./NotesForm";
import './notes.css'


const Notes = () => {
  const [state,dispatch] = useReducer(notesReducer,initialState);
  const {notes} = state;

  const [editingNote,setEditingNote] = useState(null);

  useEffect(()=>{
    const storedNotes = getNotes();
    dispatch({type: "SET_NOTES", payload: storedNotes})
  },[]);

  useEffect(()=>{
    saveNotes(notes);
  },[notes]);

  const addNote = (note) =>{
    dispatch({
      type: "ADD_NOTES",
      payload:{
        id: nanoid(),
        ...note,
      }
    });
  };

  const deleteNote= (id)=>{
    dispatch({
      type: 'DELETE_NOTES',
      payload:id,
    });
  };

  const startEdit =(note)=>{
    setEditingNote(note);
  };

  const updateNote = (updateNote)=>{
    dispatch({
      type: "UPDATE_NOTES",
      payload:{
        id: updateNote.id,
        data:updateNote,
      },
    });
    setEditingNote(null)
  };

  return (
    <div className="notes-container">
      <h2>📝 Notes System</h2>

      {/* FORM */}
      <NotesForm
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
  )
}

export default Notes
