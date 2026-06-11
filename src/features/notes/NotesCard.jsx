

const NotesCard = ({note,deleteNote,startEdit}) => {
  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>

      <p className="note-content">{note.content}</p>

      <div className="note-actions">
        <button
          className="edit-btn"
          onClick={() => startEdit(note)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default NotesCard
