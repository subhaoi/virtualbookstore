// Chat Service - Socket based chat service for customer support

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('dotenv').config()

var clients = {}; 

app.get('/', function(req, res){
  res.send('server is running');
});

io.on("connection", function (client) {  
    client.on("join", function(name){
    	console.log("Joined: " + name);
        clients[client.id] = name;
        client.emit("update", "You have been connected.");
        client.broadcast.emit("update", name + " has joined the server.")
    });

    client.on("send", function(msg){
    	console.log("Message: " + msg);
        client.broadcast.emit("chat", clients[client.id], msg);
    });

    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("update", clients[client.id] + " has left the server.");
        delete clients[client.id];
    });
});


http.listen(4000, function(){
  console.log('listening on port 4000');
});
