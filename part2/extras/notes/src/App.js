import React, {useState} from 'react'
import './App.css';
import Note from './components/note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, SetNewNote] = useState('A new note...')
  const [firstClick, SetFirstClick] = useState(true)
  const [showAll, SetShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
    console.log('EVENT: submit', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    const newNotes = notes.concat(noteObject)
    setNotes(newNotes)
    SetNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log('EVENT: input changed ; Value: ', event.target.value)
    SetNewNote(event.target.value)
  }

  const handleClick = (event) => {
    console.log('EVENT: input clicked')
    if(firstClick){
      SetNewNote('')
      SetFirstClick(false)
    } 
  }

  const handleSubmitButton = (event) => {
    console.log('Submit button clicked...')
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => SetShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange}
          onClick={handleClick}
        />
        <button type="submit" onClick={handleSubmitButton}>save</button>
      </form>   
    </div>
  )
}

export default App;