/**
 * Decides where each part of the game should be placed,
 * RWD
 */
const React = require('react')
const PropTypes = require('prop-types')

require('./table.scss')

class Table extends React.Component {
  
  render() {
    
    return (
      <div className='Table'>
        
      </div>
    )
  }
  
}

Table.propTypes = {
  players: PropTypes.object,
  cards: PropTypes.array,
  containers: PropTypes.array,
}

module.exports = Table
