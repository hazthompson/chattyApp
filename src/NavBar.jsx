import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <span className="ClientsDisplay">
          {this.props.noClients}&nbsp;Users online
        </span>
      </nav>
    );
  }
}
export default NavBar;
