const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const { log } = require('console');

const app = express();
const server = http.createServer(app);

const users = {};

app.use(cors());

const io = socketIO(server);
port = process.env.PORT;

io.on("connection",(socket)=>{
    console.log("new connection");

    socket.on('joined',({user})=>{
        users[socket.id] = user;
        console.log(users);
        console.log(`${user} has joined`);
        socket.broadcast.emit('userjoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
        socket.emit('Welcome',{user:"Admin : ",message:"Welcome To The Chat "})

    })

    socket.on('message',({message,id})=>{
        console.log(message," ",id);
        console.log(users[socket.id]);
        io.emit('sendmessage' ,{user:users[id],message,id});
    })

    socket.on('disconnect',()=>{
        if(users[socket.id]){
            socket.broadcast.emit('leave' , {user:"Admin", message:`${users[socket.id]} has left`})
        }
        else{
            delete users[socket.id];
        }
        
        console.log(`${users[socket.id]} Left `);
    })


})

app.get("/",(req,res)=>{
    res.send("working node.js server")
})

server.listen(port,()=>{
    console.log("server is working");
})