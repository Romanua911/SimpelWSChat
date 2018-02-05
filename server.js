const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

let masmessage = '';

server.on('connection', ws => {

    ws.on('message', message => {
        if (message === 'exit') {
            ws.close();
        } else if(message === '-arhive'){
            ws.send(masmessage);
        }else {
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                    masmessage=masmessage+'<br>'+message;
                }
            });
        }
    });

    ws.send('Welcome SimpelWSChat. \n History -arhive');
});