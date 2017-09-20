const React = require('react')
const PropTypes = require('prop-types')

const PlayersList = require('../components/playersList')

// require('./styles.scss')

class Cards extends React.Component {

  render() {
    return (
      <div className="flex">
        <div>
          <button onClick={()=>this.props.initGameHandler()}>
            Maybe START?
          </button>
        </div>
        <div>
          <button onClick={()=>this.props.testScoreHandler(1)}>
            + 1
          </button>
          <button onClick={()=>this.props.testScoreHandler(-1)}>
            - 1
          </button>
          {this.props.testScore}
        </div>
        <PlayersList
          title='Players'
          players={this.props.players}
          host={this.props.host}
        ></PlayersList>
      </div>
    )
  }
}

Cards.propTypes = {
  initGameHandler: PropTypes.func,
  testScoreHandler: PropTypes.func,

  players: PropTypes.object,
  host: PropTypes.string,
  testScore: PropTypes.number,
}

module.exports = Cards
