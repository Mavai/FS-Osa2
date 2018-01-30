import React from 'react'
import Kurssi from './components/Kurssi'

const App = ({ kurssit }) => {

  return (
    <div>
      {kurssit.map(kurssi => <Kurssi kurssi={kurssi} />)}
    </div>
  )
}

export default App
