import React from 'react';

const PersonForm = ({ state, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label>Nimi: </label>
        <input
          name='newName'
          value={state.newName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Numero: </label>
        <input
          name='newNumber'
          value={state.newNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default PersonForm