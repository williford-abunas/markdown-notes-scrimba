import React, { useEffect } from 'react'
import { useState } from 'react'
import Sidebar from './components/Sidebar.tsx'
import Editor from './components/Editor.tsx'
import Split from 'react-split'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { notesCollection, db } from './firebase.js'

interface Note {
  id: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])

  const [currentNoteId, setCurrentNoteId] = useState<string | null>('')

  const currentNote = notes.find((note) => note.id === currentNoteId || null)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      notesCollection,
      function (snapshot: { docs: any[] }) {
        const notesArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setNotes(notesArr)
      }
    )
    return unsubscribe
  }, [])

  useEffect(() => {
    if (notes.length > 0) {
      setCurrentNoteId(notes[0].id)
    }
  }, [notes])

  //Create new note - defaults to newNote object
  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
  }

  async function updateNote(text: string) {
    if (!currentNoteId) {
      return
    }
    const docRef = doc(db, 'notes', currentNoteId)
    await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true })
  }

  async function deleteNote(noteId: string) {
    const docRef = doc(db, 'notes', noteId)
    await deleteDoc(docRef)
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />

          <Editor currentNote={currentNote} upDateNote={updateNote} />
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
