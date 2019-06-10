import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentUser, enterMessage, enterUsername } = this.props;

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={currentUser.name}
          onBlur={enterUsername}
        />
        <input
          className="chatbar-message"
          onKeyDown={enterMessage}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}

ChatBar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  enterMessage: PropTypes.func.isRequired,
  enterUsername: PropTypes.func.isRequired
};

export default ChatBar;
