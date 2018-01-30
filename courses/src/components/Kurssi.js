import React from 'react'

const Kurssi = ({ kurssi }) => {

  const rivit = () => kurssi.osat.map(osa => <p>{osa.nimi + ' ' + osa.tehtavia}</p>)

  return (
    <div>
      <h1>{kurssi.nimi}</h1>
      {rivit()}
      <p>
        yhteensä {kurssi.osat.reduce( (total, num) => {
          return total + num.tehtavia
        }, 0)} tehtävää
      </p>
    </div>
  )
}

export default Kurssi