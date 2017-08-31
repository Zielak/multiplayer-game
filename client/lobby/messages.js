const React = require('react')
const PropTypes = require('prop-types')

class Messages extends React.Component {

  // send data to room on submit
  // FIXME: I SCREAM FOR ATTENTION
  document.getElementById('form').onsubmit = function(e) {
    e.preventDefault()

    const input = document.getElementById('input')

    // send data to room
    chatRoom.send({ message: input.value })

    // clear input
    input.value = ''
  }


  render() {
    return (
      <div>
        <h3>Messages</h3>

        <form id="form">
          <input type="text" id="input" value="" />
          <input type="submit" value="send" />
        </form>

        {this.renderList()}
      </div>
    )
  }

  renderList() {
    return (
      <div className="messages-list">
        {this.props.messages.map((message) => {
          return this.renderMessage(message)
        })}
      </div>
    )
  }

  renderClient(props) {
    return (
      <div>
        <strong>{props.client}</strong>: {props.text}
      </div>
    )
  }

}

Messages.propTypes = {
  messages: PropTypes.array
}

module.exports = Messages
