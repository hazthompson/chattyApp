import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    const { noClients, username } = this.props;

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Welcome to Chatty
          {username === 'Anonymous' ? '' : `, ${username}`}
        </a>
        <span className="ClientsDisplay">{noClients}&nbsp;Users online</span>
      </nav>
    );
  }
}
export default NavBar;
