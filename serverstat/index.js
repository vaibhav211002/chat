const http = require('http');
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const { log } = require('console');
const model = require('./schemaRec');

const app = express();
const server = http.createServer(app);

const users = {};


const savedata = async function(user,idname){

    const userdata = new model({
        username : user,
        id : idname
    })
    await userdata.save();
    console.log('data is saved');
}


const deletedata = async function(idname){
    console.log('this is your id ',idname);

    try {
        await model.findOneAndDelete({id:idname});
        console.log('data is deleted');
        
    } catch (error) {
        console.log(error);
        
    }





}

app.use(cors());
app.get("/",(req,res)=>{
    res.send("working node.js server")
})

app.get('/users', async (req, res) => {
    try {

        const data = await model.find()
        console.log(data);
        res.send(data)
    } catch (error) {
        
    }

});
app.get('/userscount',  async (req, res) => {
    try {

        const count = await model.countDocuments()
        console.log({count});
        res.send({count})
    } catch (error) {
        console.log('error to fetch');
        
    }

});



  

const io = socketio(server);
port = process.env.PORT ||  3000;

io.on("connection",(socket)=>{
    
    
    console.log("new connection");
    socket.on('joined',({user})=>{  
        users[socket.id] = user;
        console.log("user data " , user,"socket id",);
        savedata(user,socket.id);
        console.log(users);
        console.log(`${user} has joined`);
        socket.broadcast.emit('userjoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
        socket.emit('Welcome',{user:"Admin : ",message:`Welcome To The Chat ${users[socket.id]}` });
    })

    socket.on('message',({message,id})=>{
        console.log(message," ",id);
        console.log(users[socket.id]);
        // socket.emit('refetch',{})
        io.emit('sendmessage' ,{user:users[id],message,id});  
        
    })

    socket.on('disconnected',()=>{
        deletedata(socket.id);
        
        if(users[socket.id]){
            socket.broadcast.emit('leave' , {user:"Admin", message:`${users[socket.id]} has left`})
        }
        else{
            delete users[socket.id];
        }
        console.log(`${users[socket.id]} Left `);
        // socket.emit('refetch',{})

    })

    socket.on('disconnect', (reason) => {
        console.log(`User disconnected: ${socket.id}. Reason: ${reason}`);
        deletedata(socket.id);
        socket.broadcast.emit('leave' , {user:"Admin", message:`${users[socket.id]} has left`})
        console.log('all done');
      });

      const refetch = ()=>{
        socket.emit('refetch',{}) ;
      }

    socket.on('back', () => {
        deletedata(socket.id);
        if(users[socket.id]){
            socket.broadcast.emit('leave' , {user:"Admin", message:`${users[socket.id]} has left`})
        }
        else{
            delete users[socket.id];
        }
        // socket.emit('refetch',{})
        console.log(`${users[socket.id]} Left`);
    });
    
    console.log('hello');
})


const printdata = async function(){
    const data = await model.find();
    console.log(data);

}




app.use(express.json());
app.post('/server', (req, res) => {
    let frontendError = null;
    if (req.body) {
      frontendError = req.body.error;
      console.log('');
      console.log(('Frontend Error Detected'));
      console.log('');
      console.log(frontendError);
      res.send('Error received and logged');
    }
  });






server.listen(port,()=>{
    console.log("server is working");
})