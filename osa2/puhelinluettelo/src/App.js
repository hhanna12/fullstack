import React, { useState, useEffect } from 'react'
import serverService from './serverCom'


const ListofNames = ({ persons }) => {
    return (
        <div>
            {persons.map(person =>
                <OneName key={person.name} person={person} />
            )}
        </div>
    )
}
const OneName = ({ person }) => {
    return (
        <li>{person.name} {person.number}
            <button onClick={() => removePerson(person.id)}>
                delete
            </button>
        </li>
    )
}

const PersonForm = ( {namevalue, handlenamechange, numbervalue, handlenumberchange }) => {
    return(
        <>
        <div>Name: <input
            value= {namevalue}
            onChange={handlenamechange} />
        </div>
        <div>Number: <input
            value= {numbervalue}
            onChange={handlenumberchange} />
        </div>
        </>
    )
}

const removePerson = ( event ) => {
    if(window.confirm(`Do you really want to delete ?`)){
        //remove the person from database
        serverService
            .removePerson(event)       
    }
    window.location.reload()
}

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName ] = useState('')
    const [newNumber, setNewNumber ] = useState('')

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
        const nameObject = {
            name: newName,
            number: newNumber
        }
   

        serverService
            .create(nameObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })
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
            <h3>Add a new</h3>
            <PersonForm 
                namevalue = {newName} 
                handlenamechange = {handleNameChange}
                numbervalue = {newNumber} 
                handlenumberchange = {handleNumberChange}
            />
            <form onSubmit={addName}>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h3>Numbers</h3>
            <ListofNames key={persons.name} persons={persons} />
        </div>
    )
}
export default App