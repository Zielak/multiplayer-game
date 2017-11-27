import React from 'react'
import PropTypes from 'prop-types'

class Messages extends React.Component {

  render() {
    // return (
    //   <div>
    //     <h3>Messages</h3>

    //     <form id="form">
    //       <input type="text"
    //         ref={input => { this.textInput = input }}
    //       />
    //       <button onClick={e => {
    //         e.preventDefault()
    //         this.props.sendMessageHandler(this.textInput.value)
    //         this.textInput.value = ''
    //       }}>
    //         SEND
    //       </button>
    //     </form>

    //     {this.renderList()}
    //   </div>
    // )
  }

  renderList() {
    // return (
    //   <div className="messages-list">
    //     {this.props.messages.map((message, idx) => {
    //       return this.renderMessage(message, idx)
    //     })}
    //   </div>
    // )
  }

  renderMessage(/*props, key*/){
    // const client = props.client ?
    //   <span><strong className="client">{props.client}</strong>: </span> :
    //   ''
    // return (
    //   <p key={key}>
    //     {client}
    //     {props.text}
    //   </p>
    // )
  }

}

Messages.propTypes = {
  messages: PropTypes.array,
  sendMessageHandler: PropTypes.func,
}

export default Messages
