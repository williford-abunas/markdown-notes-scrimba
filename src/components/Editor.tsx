import React from 'react'
import { useState, useEffect } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'

type NoteId = 'write' | 'preview' | undefined

const Editor = ({ tempNoteText, setTempNoteText }) => {
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
        value={tempNoteText}
        onChange={setTempNoteText}
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
