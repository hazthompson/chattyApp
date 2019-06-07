import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
const webSocket = new WebSocket('ws://localhost:3001/');

const colors = [
  '#fff8a6',
  '#ffd19a',
  '#ffc5a1',
  '#ff9e74',
  '#ff6337',
  '#ee5a5a'
];
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        name: 'Anonymous',
        color: colors[Math.floor(Math.random() * 6)]
      },
      messages: [],
      noClients: 0
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
    this.enterNewUsername = this.enterNewUsername.bind(this);
  }

  newObj(username, userColor, content, type) {
    let post = {
      username: username,
      userColor: userColor,
      content: content,
      type: type
    };
    return {
      data: post
    };
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      // const colours = ['#fff8a6', '#ffd19a', '#ffc5a1', '#ff9e74'];
      const msg = this.newObj(
        this.state.currentUser.name,
        this.state.currentUser.color,
        event.target.value,
        'postMessage'
      );
      // const colour = colours[Math.floor(Math.random() * 4)];
      // const colourMessage = { msg, colour };
      this.socket.send(JSON.stringify(msg));
      event.target.value = '';
    }
  }

  enterNewUsername(event) {
    if (event.key === 'Enter') {
      const notification = this.newObj(
        event.target.value,
        this.state.currentUser.color,
        this.state.currentUser.name,
        'postNotification'
      );
      this.socket.send(JSON.stringify(notification));
      event.target.value = '';
    }
  }

  enterUsername(event) {
    this.setState({
      currentUser: {
        name: event.target.value,
        color: this.state.currentUser.color
      }
    });
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');

    this.socket.onopen = () => {
      console.log('Client connected to Server');
    };

    this.socket.onmessage = event => {
      let postReceived = JSON.parse(event.data);
      switch (postReceived.type) {
        case 'incomingMessage':
          const oldPosts = this.state.messages;
          const newPosts = [...oldPosts, postReceived];
          this.setState({
            messages: newPosts
          });
          break;
        case 'incomingNotification':
          postReceived.oldName = postReceived.content;
          this.setState({
            messages: [...this.state.messages, postReceived],
            currentUser: {
              name: postReceived.content,
              color: postReceived.userColor
            }
          });
          break;
        case 'incomingClientNo':
          this.setState({ noClients: postReceived.noClients });
      }
    };

    this.socket.onclose = () => {};
  }

  render() {
    return (
      <div>
        <NavBar
          noClients={this.state.noClients}
          username={this.state.currentUser.name}
        />
        <MessageList messageList={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          enterUsername={this.enterUsername}
          enterMessage={this.handleKeyPress}
          newUsername={this.enterNewUsername}
        />
      </div>
    );
  }
}
export default App;
