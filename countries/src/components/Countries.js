import React from 'react'
import Country from './Country';


const Countries = ({ countries, handleClick }) => {
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
  return (
    countries.map(country => <div key={country.name} onClick={handleClick(country)}>{country.name}</div>)
  )
}

export default Countries