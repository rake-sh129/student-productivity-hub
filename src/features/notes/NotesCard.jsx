

const NotesCard = ({note,deleteNote,startEdit}) => {
  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>

      <p className="note-body">{note.content}</p>

      <div className="card-actions">
        <button
          className="btn-edit"
          onClick={() => startEdit(note)}
        >
          Edit
        </button>

        <button
          className="btn-delete"
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default NotesCard
