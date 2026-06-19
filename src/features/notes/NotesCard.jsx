
const NotesCard = ({ note, deleteNote, startEdit }) => {
  console.log("NotesCard note:", note);
  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>

      <p className="note-content">{note.content}</p>

      <div className="note-actions">
      <button
  className="edit-btn"
  onClick={() => {
    console.log("Edit clicked", note);
    startEdit(note);
  }}
  disabled={!note?.id}
  title={!note?.id ? "Note id missing" : "Edit this note"}
>
  Edit
</button>

        <button
          className="delete-btn"
          onClick={() => note?.id && deleteNote(note.id)}
          disabled={!note?.id}
          title={!note?.id ? "Note id missing" : "Delete this note"}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotesCard;