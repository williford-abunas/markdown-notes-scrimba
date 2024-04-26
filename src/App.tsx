import React from 'react'
import { useState } from 'react'
import Sidebar from './components/Sidebar.tsx'
import Editor from './components/Editor.tsx'
import Split from 'react-split'
import { nanoid } from 'nanoid'

interface Note {
  id: string
  body: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ''
  )

  //Create new note - defaults to newNote object
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    }

    setNotes((prevNotes) => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text: string) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote
      })
    )
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId
      }) || notes[0]
    )
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} upDateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  )
}

export default App
