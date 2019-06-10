import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
const webSocket = new WebSocket('ws://localhost:3001/');

//array for randomizing color to asign to username
const colors = [
  '#fd5f00',
  '#05004e',
  '#76b39d',
  '#900048',
  '#00faac',
  '#ff4057'
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
  }

  //object creator function to send data to server
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

  //function to capture new message input 'on enter' and send to server
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      const msg = this.newObj(
        this.state.currentUser.name,
        this.state.currentUser.color,
        event.target.value,
        'postMessage'
      );

      this.socket.send(JSON.stringify(msg));
      event.target.value = '';
    }
  }

  //updating new username while keeping previous color
  enterUsername(event) {
    const newName = event.target.value;
    const { currentUser } = this.state;
    this.setState({
      currentUser: {
        name: newName,
        color: currentUser.color
      }
    });
    const notification = this.newObj(
      newName,
      currentUser.color,
      currentUser.name,
      'postNotification'
    );
    this.socket.send(JSON.stringify(notification));
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');

    //action taken when socket connection opened
    this.socket.onopen = () => {
      console.log('Client connected to Server');
    };

    //action taken when message received from server (state updates)
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
              name: postReceived.username,
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
        />
      </div>
    );
  }
}
export default App;
