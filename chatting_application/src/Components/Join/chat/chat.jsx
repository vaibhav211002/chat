import React, { useEffect, useState } from 'react';
import socketIO from "socket.io-client";
import "./chat.css";
import Messages from '../messages/Messages';
import ScrollToBottom from "react-scroll-to-bottom";
import { user } from '../Join/Joined';
import { Link } from 'react-router-dom';

const ENDPOINT = 'https://chat-server-dusky.vercel.app/';

const Chat = () => {
    const [id, setid] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = socketIO(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            setid(socket.id);
            console.log('Connected to server');
        });

        socket.emit('joined', { user });

        socket.on('Welcome', (data) => {
            setMessages(currentMessages => [...currentMessages, data]);
            console.log(data.user, data.message);
        });

        socket.on('userjoined', (data) => {
            setMessages(currentMessages => [...currentMessages, data]);
            console.log(data.user, data.message);
        });

        socket.on('leave', (data) => {
            setMessages(messages => ([...messages, data]));
            console.log(data.user, data.message);
        });

        socket.on('sendmessage', (data) => {
            setMessages(currentMessages => [...currentMessages, data]);
            console.log(data.user, data.message, data.id);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const send = () => {
        const message = document.getElementById('chatInput').value.trim();
        if (message !== '') {
            socket.emit('message', { message, id });
            document.getElementById('chatInput').value = "";
        }
    };

    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <h2>Chat-ting</h2>
                    <a href='/'><button className='btnclose' type="button">X</button></a>
                    <span className='headname'>Hello, {user}</span>
                </div>
                <ScrollToBottom className='chatBox'>
                    {messages.map((item, i) => <Messages key={i} user={item.id === id ? '' : item.user} message={item.message} cls={item.id === id ? 'right' : 'left'} />)}
                </ScrollToBottom>
                <div className='inputBox'>
                    <input onKeyDown={(event) => event.key === 'Enter' ? send() : null} type='text' id='chatInput' />
                    <button onClick={send} className='sendBtn'>Send</button>
                </div>
            </div>
            <div className='footer'>This website is in Development Phase. Stay tuned for updates. For any suggestion, email: <a href='mailto:vaibhavbhatt9666@gmail.com'>vaibhavbhatt9666@gmail.com</a></div>
        </div>
    );
};

export default Chat;
