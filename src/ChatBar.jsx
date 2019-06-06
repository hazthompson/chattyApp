import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const POST_LENGTH_MAX = 140;
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={this.props.currentUser.name}
          onBlur={this.props.enterUsername}
        />
        <input
          className="chatbar-message"
          onKeyDown={this.props.onEnter}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default ChatBar;
