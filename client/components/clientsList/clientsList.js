import React from 'react'
import PropTypes from 'prop-types'

require('./clientsList.scss')

class ClientsList extends React.Component {

  render() {
    return (
      <div className='ClientsList'>
        <h3>{this.props.title}</h3>
        {this.renderList()}
      </div>
    )
  }

  renderList() {
    const isHost = (clientName) => clientName === this.props.host
    return (
      this.props.clients && this.props.clients.map((client) => {
        return <div
          key={client.idx}
          className={isHost(client.name) ? 'host' : ''}
        >
          {client.idx}. {client.name}
        </div>
      })
    )
  }

}

ClientsList.propTypes = {
  clients: PropTypes.array,
  title: PropTypes.string,
  host: PropTypes.string,
}

export default ClientsList
