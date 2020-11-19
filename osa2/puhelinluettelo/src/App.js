import React, { useState, useEffect } from 'react'
import Person from './Person'
import serverService from './serverCom'
import Notification from './Notification'


const Addperson = ({ addName }) => {
  return(
    <form onSubmit={addName}>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
  )
}

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange }) => {
  return(
      <>
      <div>Name: <input
          value= {newName}
          onChange={handleNameChange} />
      </div>
      <Numberinput 
          newNumber= {newNumber} 
          handleNumberChange={handleNumberChange}/>
      </>
  )
}

const Numberinput = ({ newNumber, handleNumberChange }) => {
  return (
      <>
      <div>Number: <input
          value= {newNumber}
          onChange={handleNumberChange} />
      </div>
      </>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState(null)

 
  useEffect(() => {
    serverService
        .getAll()
        .then(initialPerson => {
            setPersons(initialPerson)
        })
  }, []
)

  const addName = (event) => {
      event.preventDefault()
      const doubletable = persons.filter(function(person) {
          return person.name === newName
      })
      
      const nameObject = {
         name: newName,
         number: newNumber
      }
      
      if(doubletable.length === 0) {
        serverService
        .create(nameObject)
        .then(returnedPerson => {
          console.log('nameobj ', returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        setMessage(`Added ${nameObject.name} `)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
      }
      else {
        window.alert(`${newName} is already added to phonebook`)
      }   
  }

  const removePerson = (id) => {
      //Let's find removable person from the persons table and remove it
      const poistettavaPerson = persons.find(n => n.id === id)
      if(window.confirm(`Delete ${poistettavaPerson.name}?`)){
        setMessage(`Person ${poistettavaPerson.name} deleted`)
        setTimeout(() => {
          setMessage(null)
      }, 5000)  
        
        const newPersonList = persons.filter(function(i) {
              return i !== poistettavaPerson
          })
          setPersons(newPersonList)

          //remove the person from db
          serverService
          .remove(id)
      }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <h3>Add a new</h3>
      <PersonForm newName={newName}
          handleNameChange={handleNameChange}
          newNumber = {newNumber}
          handleNumberChange = {handleNumberChange} 
      />
      <Addperson addName={addName}/>
    
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => 
            <Person key={person.name} person={person} removePerson={() => removePerson(person.id)} />
          )}
        </ul>
    </div>
  )

}

export default App