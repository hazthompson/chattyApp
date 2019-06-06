import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
const webSocket = new WebSocket('ws://localhost:3001/');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: [],
      noClients: 0
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
    this.enterNewUsername = this.enterNewUsername.bind(this);
  }

  newObj(username, content, type) {
    let post = {
      username: username,
      content: content,
      type: type
    };

    return {
      data: post
    };
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      const msg = this.newObj(
        this.state.currentUser.name,
        event.target.value,
        'postMessage'
      );
      this.socket.send(JSON.stringify(msg));
      event.target.value = '';
    }
  }

  enterNewUsername(event) {
    if (event.key === 'Enter') {
      const notification = this.newObj(
        this.state.currentUser.name,
        event.target.value,
        'postNotification'
      );
      this.socket.send(JSON.stringify(notification));
      event.target.value = '';
    }
  }

  enterUsername(event) {
    this.setState({ currentUser: { name: event.target.value } });
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');

    this.socket.onopen = () => {
      console.log('Client connected to Server');
      // console.log('event from server', event);
      // console.log('in event try to find data', event.target);
      // this.setState({ noClients: event.eventPhase });
      // console.log('state of noClients', this.state.noClients);
    };

    this.socket.onmessage = event => {
      let postReceived = JSON.parse(event.data);
      console.log('fromserver', postReceived);
      switch (postReceived.type) {
        case 'incomingMessage':
          const oldPosts = this.state.messages;
          const newPosts = [...oldPosts, postReceived];
          this.setState({ messages: newPosts });
          break;
        case 'incomingNotification':
          postReceived.oldName = postReceived.username;
          this.setState({
            messages: [...this.state.messages, postReceived],
            currentUser: { name: postReceived.content }
          });
          break;
        case 'incomingClientNo':
          console.log('post parse', postReceived);
          console.log('event - nonparse', event);
          this.setState({ noClients: postReceived.noClients });
      }
    };

    this.socket.onclose = () => {};
  }

  render() {
    return (
      <div>
        <NavBar noClients={this.state.noClients} />
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
