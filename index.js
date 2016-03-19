var express = require('express'); 
var app = express();
var server = require('http').createServer(app); 
var io = require('socket.io').listen(server);
var fs = require('fs');
var EventEmitter = require('events');
var people = {};

//ALL REQUIRED IN ORDER FOR NODE TO FUNCTION
//SEPERATE MODULES NEEDED FOR THIS TO WORK SUCH AS SOCKET.IO AND EXPRESS.

//var $uInput = $('#displayNames');
var username;

var totalUsers = 0;
var deletedUsers = -1;

//HERES ME TRYING ALL THE DIFFERENT WAYS TO INCLUDE SOCKET.IO-CLIENT TO THE SITE AFTER NUMEROUS EVENTS REALIZED THIS WAS NOT GOING TO WORK. 

//var client = require('socket.io-client');

//    io = require('socket.io-client')(server);

//socket.io-client
  
//app.get('/', function (req, res) {
//  res.send('PLEASE WORK!!!');
//});

app.get('/', function(req, res){
    
//    res.sendFile(__dirname + '/index.html');
    //THIS LOADS THE INDEX.HTML FILE FOR US AND DISPLAYS IT TO THE USER.
    res.sendFile(__dirname + '/index.html'); 
    
});

//USING DIFFERENT NAMESPACES HERE IN ORDER TO SEE IF CREATING A DIFFERENT CHAT ROOMS WAS A POSSIBILITY - IT IS. 

//app.use('/chat', function(req, res){
//    
//    res.sendFile(__dirname + '/index.html');
//    console.log("chat");
//});

io.on('connection', function(socket){ //THE MAIN INITIATING CALL THAT NOTIFIES US THAT A USER HAS CONNECTED, ONCE THIS OCCURS WE ARE ABLE TO CONTINUE WITH ADDING FUNCTIONALY THAT MULTIPLE USERS CAN SEE. 
    
    
     var addedUsers = 1; //THIS IS BEING USED TO KEEP TRACK OF THE TOTAL NUMBER OF USERS BEING ADDED ("EVERYTIME SOMEONE JOINS, IT IS A SINGLE PERSON ENTERING THE CHAT")
    
    //USED TOTALUSERS++ TO KEEP TRACK OF HOW MANY USERS THERE ARE.
    
     totalUsers++; //counts a user everytime someone joing the chat
     console.log(totalUsers);
    
    
    console.log('Finally, someone has connected!'); //EVERYTIME SOMEONE CONNECTS IT GETS DISPLAYED IN THE CONSOLE
    

    socket.on('unameSubmit', function(dmx){ //THIS FUNCTION MAKES IT POSSABLE TO UPDATE THE USERS IN THE CHAT
// PASS "DMX" AS THE VARIABLE WHICH HOLDS THE USERS CHOSEN DISPLAY NAME.         
//         console.log('Chosen Name Is: ' + dmx);
        
         var x = dmx;
        
         console.log(dmx);
    
         io.emit('setName', dmx, totalUsers); //THE EVENT HANDLER ON THE CLIENT SIDE IS WAITING FOR THIS EVENT TO GET EMITTED. 

     
     });
    
    
    socket.on('themsg', function(im){ //THE MAIN CHAT FUNCTION THAT CARRIES THE DATA TO THE CLIENT AND UPDATES THE VIEW/SITE
        
//         console.log('NameGoesHere: ' + im);
 
    
         io.emit('hello', im); 

     
     });
    

    
    socket.on('disconnect', function(){ //EVERYTIME A USER DISCONNECTS THIS EVENT IS FIRED IN THE BACKGROUND. 
        //HERE AFTER THE USER LEAVES WE CAN TAKE THE UPDATED COUNT INFORMATION AND DISPLAY IT TO USER.


        totalUsers--; //EVERYTIME A USER LEAVES -1 FROM THE TOTAL COUNT OF USERS. (EASY WAY TO KEEP TRACK)
        console.log('Someone has disconnected');
        
        io.emit('left', totalUsers); //SET OFF AN EVENT CALLED "LEFT" THAT WILL TAKE TOTALUSERS DATA TO THE CLIENT SIDE 
        
    });
    
});

//app.listen(3000, function () {
//  console.log('Chat app listening on port 3000!');
//});

server.listen(3000, function () { // OUR MAIN SERVER WHICH IS SERVING THE FILES TO USERS
    
    console.log('This chat app is listening on port 3000!'); //VERY EXCITED TO SEE NODE WORKING!
    
});

