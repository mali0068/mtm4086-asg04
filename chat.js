var express = require('express');
var app = express();
var server = require('http').createServer(app); 
var io = require('socket.io')(server);
//var fs = require('fs');
//var client = require('socket.io-client');

//    io = require('socket.io-client')(server);

//socket.io-client

//app.get('/', function (req, res) {
//  res.send('Hello World!!!');
//});


app.use('/chat', function(req, res){
    
    res.sendFile(__dirname + '/chat.html');
//    console.log("chat");
});

io.on('connection', function(socket){
  
    console.log('Someone has connected!');
    
    
    socket.on('themsg', function(im){
        
         
         console.log('usernameHere: ' + im);
        
//         $('.displayArea').html('<h2>' + im + '</h2>');
//         io.emit('hello', im);
//         socket.send(im);
//         io.emit('themsg', im);
     
     });
//    
    socket.on('disconnect', function(){

        console.log('Someone has disconnected');

    });
//    
});

//app.listen(3000, function () {
//  console.log('Chat app listening on port 3000!');
//});

server.listen(3000, function () {
    
    console.log('Chat app listening on port 3000!');
    
});
