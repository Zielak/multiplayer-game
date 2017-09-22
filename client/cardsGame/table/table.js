/**
 * Decides where each part of the game should be placed,
 * RWD
 */
const React = require('react')
const PropTypes = require('prop-types')

require('./table.scss')

const positionFromAngle = (angle, distance) => {
  const x = distance * Math.cos(angle * (Math.PI * 2 / 360))
  const y = distance * Math.sin(angle * (Math.PI * 2 / 360))
  return {left: x+50+'%', top: y+50+'%'}
}

class Table extends React.Component {

  render() {
    let players, containers

    if(this.props.players){
      const angle = this.props.players.list ? 360 / this.props.players.list.length : 0
      players = this.props.players.list.map((el, idx) => {
        // TODO: align angle to the current player
        const position = positionFromAngle(angle * idx+90, 40)
        return (
          <player key={idx} style={position}>
            {'player:'+idx}<br/>
            {'angle:'+angle*idx}
          </player>
        )
      })
    }
    
    if(this.props.containers){
      const angle = this.props.players.list ? 360 / this.props.players.list.length : 0
      players = this.props.players.list.map((el, idx) => {
        // TODO: align angle to the current player
        const position = positionFromAngle(angle * idx+90, 40)
        return (
          <player key={idx} style={position}>
            {'player:'+idx}<br/>
            {'angle:'+angle*idx}
          </player>
        )
      })
    }

    return (
      <div className='Table'>
        {players}
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
