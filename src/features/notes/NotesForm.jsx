import { useState } from "react";

const NotesForm = ({ addNote, editingNote, updateNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

    // reset form
    setTitle("");
    setContent("");
  };

  return (
    <form className="add-note-form" onSubmit={handleSubmit}>
      <input
        className="glass-input"
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="glass-textarea"
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="btn-add" type="submit">
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};

export default NotesForm;