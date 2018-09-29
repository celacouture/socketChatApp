var express=require('express');
var socket=require('socket.io');

//app setup
var app=express();
var server=app.listen(5000, function(){
  console.log('Listening on port 5000');
})
//get static files
app.use(express.static('public'));

//socket set up
var io=socket(server);
io.on('connection',  function(socket){
  console.log('Made socket connection', socket.id);

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit("typing", data);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
