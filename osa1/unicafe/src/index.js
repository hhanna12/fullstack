import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>no feedback given</p>
    )
  }
  return (
    <>
      <StaticLine text="good" value={props.good} />
      <StaticLine text="neutral" value={props.neutral} />
      <StaticLine text="bad" value={props.bad} />
      <StaticLine text="all" value={props.all} />
      <Average good={props.good} neutral={props.neutral} bad={props.bad} all={props.all}/>      <StaticLine text="good" value={props.good} />
      <Positive good={props.good} all={props.all}/>
    </>
  )
}


const StaticLine = (props) => {
  return (
    <>
      <p>{props.text} {props.value}</p>
    </>
  )
}


const Average = (props) => {
  if (props.all === 0) {
    return (
      <p></p>
    )
  }
  return (
    <StaticLine text="average" value={((props.good*1) + (props.neutral*0) + (props.bad*(-1)))/props.all} />
    )
}


const Positive = (props) => {
  if (props.all ===0) {
    return (
      <p></p>
    )
  }
  return (
    <StaticLine text="positive" value={(props.good / props.all)} />
    )
}


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const goodVote = () => {
    setGood(good + 1)  
  }
  const neutralVote = () => {
    setNeutral(neutral + 1)

  }
  const badVote = () => {
    setBad(bad + 1)
  }
 
 
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodVote} text='good' />
      <Button onClick={neutralVote} text='neutral' />
      <Button onClick={badVote} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)