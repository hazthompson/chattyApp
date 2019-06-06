import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const webSocket = new WebSocket('ws://localhost:3001/');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
  }

  newObj(username, content) {
    let post = {
      username: username,
      content: content
    };

    return {
      type: 'post',
      data: post
    };
  }

  handleKeyPress(event) {
    // const webSocket = new WebSocket('ws://localhost:3001/');
    if (event.key === 'Enter') {
      //console.log(event.target.value);
      const msg = this.newObj(this.state.currentUser.name, event.target.value);
      this.socket.send(JSON.stringify(msg));
      console.log('message review:', msg);
      event.target.value = '';
    }
  }

  enterUsername(event) {
    console.log('caling enterUsername', event.target.value);
    //console.log(this.state.currentUser);
    this.setState({ currentUser: { name: event.target.value } });
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');

    this.socket.onopen = () => {
      console.log('Client connected to Server');
    };

    this.socket.onmessage = event => {
      console.log(event);
      let postReceived = JSON.parse(event.data);
      console.log('content', postReceived);
      const oldPosts = this.state.messages;
      const newPosts = [...oldPosts, postReceived];
      console.log(newPosts);
      this.setState({ messages: newPosts });
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messageList={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          enterUsername={this.enterUsername}
          onEnter={this.handleKeyPress}
        />
      </div>
    );
  }
}
export default App;
