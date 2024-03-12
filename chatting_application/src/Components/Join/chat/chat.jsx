import React, { useEffect, useState } from 'react'
import { user } from '../Join/Joined'
import socketIO from "socket.io-client";
import "./chat.css";
// import sendlogo from '../../../images/sendlogo.jpeg'
import Messages from '../messages/Messages';
import ScrollToBottom  from "react-scroll-to-bottom";
import { Link } from 'react-router-dom';
import Usercord from '../userrecord/Usercord';


let socket;

const ENDPOINT = "https://chat-1sever.onrender.com";


const test = (user)=>{
    const userdet = {user};
    if ( typeof userdet.user === 'undefined' ) {
        window.location.href = '/';
        
    }
}


const Chat = () => {

    test(user);
    const [id, setid] = useState('');
    const [messages, setMessages] = useState([]);
    const [endmsg, setendmsg] = useState([]);
    const [ndata,setdata] = useState([]);
    const fetchdata = () =>{
    fetch('https://chat-1sever.onrender.com/users')
    .then(response =>response.json())
    .then(data=>{
        setdata(data)
    })
}
    


    const send = ()=>{
        const message = document.getElementById('chatInput').value ;
        document.getElementById('chatInput').value = "";
        socket.emit('message',{message,id})
        
    }

    const back = ()=>{
        socket.emit('back');

    }


useEffect(()=>{
    socket = socketIO(ENDPOINT,{transports:['websocket']});
    
    socket.on('connect',()=>{
        // alert('connected');
        setid(socket.id);
    })

    socket.emit('joined',{user});

    socket.on('Welcome',(data)=>{
        setMessages(currentMessages => [...currentMessages, data]);
        fetchdata();

    })

    socket.on('userjoined',(data)=>{
        setMessages(currentMessages => [...currentMessages, data]);
        fetchdata();



    })
    socket.on('leave',(data)=>{

    setMessages(messages => ([...messages,data]));
        fetchdata();
    })


    console.log(messages);



    return ()=>{


        socket.emit('disconnected');
        socket.off();
        
        
        

    }
},[])

useEffect(() => {

    socket.on('sendmessage',(data)=>{
        console.log(data);
        setMessages(currentMessages => [...currentMessages, data]);
        console.log(data.user,data.message,data.id);
        

    })
  return () => {
    socket.off();
  }
}, [])

  return (
    <div className='conatiner'>
        <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
                <h2>Chat-ting</h2>
                <a href='/'><button className='btnclose' onClick={back} type="button">X</button></a>
                <span className='headname'>Hello , {user}</span>
            </div>
            <ScrollToBottom  className='chatBox'>
                {messages.map((item,i)=> <Messages user={item.id===id?'':item.user} message={item.message} cls={item.id===id?'right':'left'} />)}                
            </ScrollToBottom >
            <div className='inputBox'>
                <input onKeyDown={(event)=> event.key === 'Enter' ? send() : null} type='text' id='chatInput' />
                <button onClick={send} className='sendBtn'>Send</button>
            </div>

        </div>

    </div>
    <div>
        <Usercord data={ndata}/>
    </div>
    <div className='footer'>This website is in Development Phase . Stay tuned for updates.For any suggestion Mail: <a href='vaibhavbhatt9666@gmail.com'>vaibhavbhatt9666@gmail.com</a></div>

    </div>
    
  )
}

export default Chat