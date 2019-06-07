const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', ws => {
  ws.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
      console.log('data sent: ', data);
    });
  };

  function noClientObj() {
    obj = {
      type: 'incomingClientNo',
      noClients: wss.clients.size
    };
    const clientString = JSON.stringify(obj);
    return clientString;
  }

  const clientString = noClientObj();

  console.log(noClientObj, 'clients connected');
  ws.broadcast(clientString);

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

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    ws.broadcast(clientString);
  });
});