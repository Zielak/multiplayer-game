import React from 'react'
import PropTypes from 'prop-types'

require('./playersList.scss')

class PlayersList extends React.Component {

  render() {
    return (
      <div className='PlayersList'>
        <h3>{this.props.title}</h3>
        {this.renderList()}
      </div>
    )
  }

  renderList() {
    const isHost = (playerName) => playerName === this.props.host
    return (
      this.props.players && this.props.players.list.map((player, idx) => {
        const timeleft = player.timeleft === 'Infinity' ?
          <strong>∞</strong> :
          player.timeleft
        
        return <div
          key={idx}
          className={(isHost(player.name) ? 'host' : '') + ' player'}
        >
          <div className='name'>{idx}. {player.name}</div>
          <div className='stats'>
            <div className='score'>score: {player.score}</div>
            <div className='timeleft'>time: {timeleft}</div>
          </div>
        </div>
      })
    )
  }

}

PlayersList.propTypes = {
  players: PropTypes.object,
  title: PropTypes.string,
  host: PropTypes.string,
}

export default PlayersList
