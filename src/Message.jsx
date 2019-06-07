import React, { Component } from 'react';

class Message extends Component {
  render() {
    if (this.props.message.type === 'incomingNotification') {
      //notification triggered/rendered if user changes their username
      return (
        <div className="message system">
          <span className="notification">
            {this.props.message.oldName} changed their username to&nbsp;
            {this.props.message.username}
          </span>
        </div>
      );
    } else if (this.props.message.type === 'incomingMessage') {
      //new message rendered (to all clients) when new message entered.
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
