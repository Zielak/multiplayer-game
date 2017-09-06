const React = require('react')
const PropTypes = require('prop-types')

const PlayersList = require('../components/clientsList')

// require('./styles.css')

class Cards extends React.Component {

  render() {
    return (
      <div className="flex">
        <div>
          <button onClick={()=>this.props.initGameHandler()}>
            Maybe START?
          </button>
        </div>
        <PlayersList
          title='Players'
          clients={this.props.players}
          host={this.props.host}
        ></PlayersList>
      </div>
    )
  }
}

Cards.propTypes = {
  initGameHandler: PropTypes.func,
  players: PropTypes.array,
  host: PropTypes.string,
}

module.exports = Cards
