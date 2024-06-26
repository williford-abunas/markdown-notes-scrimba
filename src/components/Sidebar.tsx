import React from 'react'

interface Note {
  body: any
  id: string
}
interface Props {
  notes: Note[]
  currentNote?: Note
  setCurrentNoteId: (noteId: string | null) => void
  newNote: React.MouseEventHandler<HTMLButtonElement> | undefined
  deleteNote: (noteId: string) => void
}

const Sidebar = (props: Props) => {
  const noteElements = props.notes.map((note) => (
    <div key={note.id}>
      <div
        className={`title ${
          props.currentNote && note.id === props.currentNote.id
            ? 'selected-note'
            : ''
        }`}
        onClick={() => {
          console.log('clicked', note.id, props.currentNote?.id)
          props.setCurrentNoteId(note.id)
        }}
      >
        <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
        <button
          className="delete-btn"
          onClick={() => props.deleteNote(note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ))
  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  )
}

export default Sidebar
