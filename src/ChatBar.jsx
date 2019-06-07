import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={this.props.currentUser.name}
          onBlur={this.props.enterUsername}
          onKeyDown={this.props.newUsername}
        />
        <input
          className="chatbar-message"
          onKeyDown={this.props.enterMessage}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default ChatBar;
