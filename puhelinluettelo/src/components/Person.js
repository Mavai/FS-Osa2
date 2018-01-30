import React from 'react';

const Person = ({ person, handleClick }) => {
  return (
    <tr><th>{person.name}</th><td>{person.number}</td><td><button onClick={handleClick}>poista</button></td></tr>
  )
}

export default Person