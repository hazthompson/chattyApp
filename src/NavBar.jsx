import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    const { noClients, username } = this.props;

    //render username in navbar if name has been set (from anonymous)
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Welcome to <span className="chatty">Chatty</span>
          {username === 'Anonymous' ? '' : `, ${username}`}
        </a>
        <span className="ClientsDisplay">{noClients}&nbsp;Users online</span>
      </nav>
    );
  }
}
export default NavBar;
