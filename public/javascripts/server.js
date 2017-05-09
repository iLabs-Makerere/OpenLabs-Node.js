var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 3131}); //ws node library

var ws_clients = {}

// wss.on('connection', function(ws) {
//     ws.on('message', function(message) {
//         console.log('received: %s', message);
//     });
//     ws.send('something');
// });  //documentation

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('R: %s', message);
        var data = JSON.parse(message); //JSON.parse turns a string of JSON text into a Javascript object.
        action = data[1];
        if(action == "Connect"){
            var client = data[0];
            ws_clients[client] = ws;//saves client to ws_clients object
        } 
      else{
            var destination = data[0];
            try{
                ws_clients[destination].send(data[1]);//sends message to destination
                console.log(data[1]);
            }catch(e){
              
            }
            //wss.broadcast(message);
        }
    });
});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        try{
            client.send(data);
        }catch(e){
        }
    });
};