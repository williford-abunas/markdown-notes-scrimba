import React from 'react'
import { useState } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'

type NoteId = 'write' | 'preview' | undefined

const Editor = ({ currentNote, upDateNote }) => {
  const [selectedTab, setSelectedTab] = useState<NoteId>('write')

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  return (
    <section className="pane editor">
      <ReactMde
        value={currentNote.body}
        onChange={upDateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  )
}

export default Editor
