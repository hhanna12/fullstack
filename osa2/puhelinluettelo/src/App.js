import React, { useState, useEffect } from 'react'
import axios from 'axios'



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
        <li>{person.name} {person.number}</li>
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

const App = (props) => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName ] = useState('')
    const [newNumber, setNewNumber ] = useState('')

    useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
      }, []
    )


    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber
        }
        for(var i=0; i < persons.length; i++){
            if(newName !== persons[i].name){
                setPersons(persons.concat(nameObject))
                setNewName('')
                setNewNumber('')
            }
            else{
                window.alert(`${newName} is already added to phonebook`)
                setPersons(persons.concat())
                i=persons.length
            }
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