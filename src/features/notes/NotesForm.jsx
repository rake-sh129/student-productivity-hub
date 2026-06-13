import { useState } from "react";

const NotesForm = ({ addNote, editingNote, updateNote }) => {
  // Initialize state directly from the prop (it will recalculate whenever the key changes)
  const [title, setTitle] = useState(editingNote ? editingNote.title : "");
  const [content, setContent] = useState(editingNote ? editingNote.content : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      updateNote({
        ...editingNote,
        title,
        content,
      });
    } else {
      addNote({
        title,
        content,
      });
    }

    // You can keep these to clear the form after creating a new note
    setTitle("");
    setContent("");
  };

  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};

export default NotesForm;