import React, { Component } from 'react';

class Message extends Component {
  render() {
    if (this.props.message.type === 'incomingNotification') {
      return (
        <div className="message system">
          <span>
            {this.props.message.oldName} changed their username to&nbsp;
            {this.props.message.username}
          </span>
        </div>
      );
    } else if (this.props.message.type === 'incomingMessage') {
      return (
        <div className="message">
          <span
            className="message-username"
            style={{ color: this.props.message.userColor }}
          >
            <em>{this.props.message.username}</em>
          </span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      );
    }
  }
}
export default Message;
