import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id:1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id:2, 
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // onCompose(event) {
  //   this.setState((prev, props) => ({
  //     content: '',
  //     error: '',
  //     visible: {
  //       compose: !prev.visible.compose
  //     }
  //   }));
  // }

  // onContent(event) {
  //   this.setState({
  //     content: event.target.value
  //   });
  // }

  handleKeyPress(event){
    if (event.key === 'Enter') {
      console.log(event.target.value);
     
     
      let newObj = {
        id:12,
        username: this.state.currentUser.name,
        content: event.target.value
      }

      console.log(newObj)
      const oldMessages= this.state.messages
      const newMessages= [...oldMessages, newObj]
      console.log(oldMessages)
      console.log(newMessages)
     
      console.log(this.state.content);
      this.setState({messages: newMessages})
      event.target.value ='';
    }
    
    
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messageList={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser}
        onEnter={this.handleKeyPress} />
        
      </div>
    );
  }
}
export default App;
