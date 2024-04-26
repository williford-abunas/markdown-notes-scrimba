import React from 'react'

interface Props {
  notes: { id: React.Key | null | undefined; body: string }[]
  currentNote: { id: React.Key | null | undefined }
  setCurrentNoteId: (arg0: React.Key | null | undefined) => void
  newNote: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Sidebar = (props: Props) => {
  const noteElements = props.notes.map(
    (note: { id: React.Key | null | undefined; body: string }) => (
      <div key={note.id}>
        <div
          className={`title ${
            note.id === props.currentNote.id ? 'selected-note' : ''
          }`}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
        </div>
      </div>
    )
  )
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
