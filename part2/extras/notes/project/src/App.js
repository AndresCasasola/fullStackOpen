import React, {useState, useEffect} from 'react'
import './App.css';
import Note from './components/note'
import Notification from './components/notification'
import Footer from './components/footer'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, SetNewNote] = useState('A new note...')
  const [firstClick, SetFirstClick] = useState(true)
  const [showAll, SetShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

useEffect(() => { noteService.getAll().then(initNotes  => setNotes(initNotes)) }, [])

const addNote = (event) => {
  event.preventDefault()
  console.log('EVENT: submit', event.target)

  const noteObject = {
    id: notes.length + 1,
    content: newNote,
    date: new Date().toISOString(),
    important: Math.random() < 0.5
  }

  noteService
    .create(noteObject)
    .then(createdNote => {
      setNotes(notes.concat(createdNote))
      SetNewNote('')
  })
}

  const handleNoteChange = (event) => SetNewNote(event.target.value)

  const handleClick = (event) => {
    if(firstClick){
      SetNewNote('')
      SetFirstClick(false)
    } 
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
      .update(id, changedNote).then(updatedNote => {
        setNotes(notes.map(note => note.id !== id ? note : updatedNote))
      })
      .catch(error => {
        setErrorMsg(`Error: Note '${note.content}' was already removed from server`)
        setTimeout(() => setErrorMsg(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification msg={errorMsg}/>
      <div>
        <button onClick={() => SetShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange}
          onClick={handleClick}
        />
        <button type="submit">save</button>
      </form>   

      <Footer />
    </div>
  )
}

export default App;