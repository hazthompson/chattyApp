import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const allMessages = this.props.messageList.map(message => {
      return <Message key={message.id} message={message} />;
    });

    return <main className="messages">{allMessages}</main>;
  }
}
export default MessageList;
