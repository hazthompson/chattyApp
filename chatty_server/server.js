const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Port set to 3001
const PORT = 3001;

// new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// the WebSockets server
const wss = new SocketServer({ server });

//callback that will run when a client connects to the server and updates 'users online display'
wss.on('connection', ws => {
  ws.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  };

  //function to pass 'no clients online' as an object to client to read
  function noClientObj() {
    obj = {
      type: 'incomingClientNo',
      noClients: wss.clients.size
    };
    const clientString = JSON.stringify(obj);
    return clientString;
  }

  const clientString = noClientObj();
  ws.broadcast(clientString);

  //store new messages/notification from client and send back as stringified onbjects to client
  ws.on('message', message => {
    const post = JSON.parse(message).data;
    post.id = uuidv1();

    if (post.type === 'postMessage') {
      post.type = 'incomingMessage';
    } else if (post.type === 'postNotification') {
      post.type = 'incomingNotification';
    }

    const postSend = JSON.stringify(post);
    ws.broadcast(postSend);
  });

  // Set up a callback for when a client closes the socket to update 'users online display'
  ws.on('close', () => {
    ws.broadcast(noClientObj());
  });
});
