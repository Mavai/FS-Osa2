import React from 'react'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null
    }
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  addPerson = (event) => {
    event.preventDefault()
    const person = this.state.persons.find(person => person.name === this.state.newName)
    if (!person) {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({ 
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            notification: `${personObject.name} was added.`
          })
        })

    } else if (window.confirm(`${person.name} already exists, do you want to replace the number`)) {
      this.updatePerson(person)
    }
    setTimeout(() => {
      this.setState({notification: null})
    }, 5000);
  }

  updatePerson = (person) => {
    const changedPerson = { ...person, number: this.state.newNumber}
    personService
      .update(changedPerson.id, changedPerson)
      .then(response => {
        this.setState({
          persons: this.state.persons.map(person => person.id !== changedPerson.id ? person : changedPerson),
          newName: '',
          newNumber: '',
          notification: `${changedPerson.name} was updated`
        })
      })
      .catch(error => this.handleError(changedPerson))
  }

  removePerson = (person) => () => {
    if (window.confirm(`Do you really want to remove ${person.name}`)) {
      personService
        .remove(person.id)
        .then(response => {
          this.setState({
            persons: response,
            newName: '',
            newNumber: '',
            notification: `${person.name} was removed.`
          })
        })
        .catch( error => this.handleError(person))
        setTimeout(() => {
          this.setState({notification: null})
        }, 5000);
    }
  }

  handleError = (removedPerson) => 
    this.setState({
      persons: this.state.persons.filter(person => person.id !== removedPerson.id),
      newName: '',
      newNumber: '',
      notification: `${removedPerson.name} has already been removed from the server.`
  })

  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  render() {
    const personsToShow = 
      this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <Notification message={this.state.notification} />
        <h2>Puhelinluettelo</h2>
        Hae: 
        <input 
          name='filter'
          value={this.state.filter}       
          onChange={this.handleChange}
        />

        <h2>Lisää uusi</h2>
        <PersonForm handleChange={this.handleChange} handleSubmit={this.addPerson} state={this.state}/>

        <h2>Numerot</h2>
        <table>
          <tbody>
            {personsToShow.map(person => <Person key={person.name} person={person} handleClick={this.removePerson(person)} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
