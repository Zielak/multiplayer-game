import React from 'react'
import PropTypes from 'prop-types'

import { PlayersList } from '../components'
import { Table } from '../cardsGame'

require('./game.scss')

class WarGame extends React.Component {

  render() {
    return (
      <div className='game'>
        <div className='flex header'>
          <div>
            <h1>WarGame</h1>
          </div>
          <div>
            <button onClick={() => this.props.initGameHandler()}>
              Maybe START?
            </button>
          </div>
        </div>
        <Table
          players={this.props.players}
          cards={this.props.cards}
          containers={this.props.containers}
        ></Table>
        <PlayersList
          title='Players'
          players={this.props.players}
          host={this.props.host}
        ></PlayersList>
      </div>
    )
  }
}

WarGame.propTypes = {
  initGameHandler: PropTypes.func,
  testScoreHandler: PropTypes.func,
  testAngle: PropTypes.number,

  players: PropTypes.object,
  cards: PropTypes.array,
  containers: PropTypes.array,

  host: PropTypes.string,
  testScore: PropTypes.number,
}

export default WarGame
