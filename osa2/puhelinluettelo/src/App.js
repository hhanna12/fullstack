import React, { useState } from 'react'
import Note from './Note'



const App = (props) => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas',
          number: '+358 44 123432' }
    ]) 
    const [newName, setNewName ] = useState('')
    const [newNumber, setNewNumber ] = useState('')

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
            <form onSubmit={addName}>
                <div>
                    name: <input
                    value={newName}
                    onChange = {handleNameChange} />
                </div>
                <div>
                    number: <input
                    value={newNumber}
                    onChange = {handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => 
                    <Note key={person.name} person={person} />
                )}
            </ul>
        </div>
    )
}
export default App