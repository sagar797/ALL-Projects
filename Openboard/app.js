const express = require("express");
const app = express();
// const path = require("path");
const httpServer = require("http").createServer(app);
const socketServer = require("socket.io")(httpServer);

// to access the public folder, it executes the application on 3000.
app.use(express.static("activity"));

socketServer.on("connection",function(socket){
    console.log("New client connected");
    console.log(socket.id);
    //listener 
    socket.on("colorChange",function(color){
        console.log(color);
        socket.broadcast.emit('rColorChange',color);
    })
    // for mousedown event 
    socket.on("md",function(point){
        console.log(point);
        socket.broadcast.emit("onmd",point);
    })
    socket.on("mm",function(point){
        console.log(point);
        socket.broadcast.emit("onmm",point);
    })
})


// 127.0.0.1:3000/home
// app.get("/home",function(req,res){
    // res.end("My home page");

    // cannot send folder to it 
    // res.sendFile(path.join(__dirname,"activity"));
// })

// TCP port => uniquely identify server on a machine 
let port = process.env.PORT||3000;

httpServer.listen(port,function(){
    console.log("Server is listening to request at port "+port);
})