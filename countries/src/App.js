import React, { Component } from 'react'
import Countries from './components/Countries'
import countryService from './services/countries'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      fullName: null
    }
  }

  handleChange = (event) => this.setState({ 
    [event.target.name]: event.target.value,
    fullName: null
  })

  handleClick = (country) => () => {
    console.log(country.id)
    this.setState({ 
      filter: country.name,
      fullName: country.name
     })
  }
  componentWillMount() {
    countryService
    .getAll()
    .then(countries => this.setState({ countries }))
  }

  render() {
    let countriesToShow = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    console.log(this.state.fullName)
    if (this.state.fullName) countriesToShow = this.state.countries.filter(country => country.name === this.state.fullName)
    return (
      <div>
        <input 
          name='filter'
          value={this.state.filter}       
          onChange={this.handleChange}
        />
        <Countries countries={countriesToShow} handleClick={this.handleClick} />
      </div>
    )
  }
}

export default App
