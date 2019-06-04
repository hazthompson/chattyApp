import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
     
    // this.state = {
    //   content: '',
    //   error: '',
    //   visable: {
    //     compose:true
    //   }
    // }

    // this.onCompose = this.onCompose.bind(this);
    // this.onContent = this.onContent.bind(this);
    // this.onPost = this.onPost.bind(this);
  }
  render() {
    const POST_LENGTH_MAX = 140;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" onKeyDown={this.props.onEnter} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;