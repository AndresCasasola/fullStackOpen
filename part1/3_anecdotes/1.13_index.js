import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getRandomInt = (max) => Math.floor(Math.random() * max)

const VotesDisplay = ({selected}) => {
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const handleClickVote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected]++
    setPoints(pointsCopy)
  }
  return(
    <div>
      <p>Has {points[selected]} votes!</p>
      <button onClick={handleClickVote}>Vote</button>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
 
  const handleClickNext = () => {
    let rand = getRandomInt(anecdotes.length)
    while(rand === selected){
      rand = getRandomInt(anecdotes.length)
    }
    setSelected(rand)
  }
  return (
    <div>
      <p><button onClick={handleClickNext}>Next anecdote</button></p>
      <p>{props.anecdotes[selected]}</p>
      <VotesDisplay selected={selected}/>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)