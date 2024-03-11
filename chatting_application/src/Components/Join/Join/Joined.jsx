import React, { useState ,useEffect } from 'react'
import "./Join.css"
import { Link} from 'react-router-dom'

let user;


export const Joined = () => {

  const senduser = () =>{
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";
  }

  const [name, setname] = useState("");
  const [data, setdata] = useState("0")

  const fetchdata = () =>{
    fetch('https://chat-1sever.onrender.com/userscount')
    .then(response =>response.json())
    .then(data=>{
        setdata(data.count)
        console.log(data);
    })}


  const handlechange = (e)=>{
    setname(e.target.value);
  }
  useEffect(() => {
    fetchdata();
}, []);



  console.log(name);

  return (
    <div>
          <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src="https://th.bing.com/th/id/OIP.g_jFE_ijXkNaWUHkjzpY7AHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.9&pid=1.7" alt="logo" />
        <h1>Chat-ting</h1>
        <div className='online'> World Chat Online : {data}</div>
        <input onChange={handlechange} type='text' id='joinInput' placeholder='Enter Your Name'/>
        <Link onClick={(e)=>!name?e.preventDefault():null} to="/chat" ><button onClick={senduser} className='joinbtn'>Login</button></Link>
        
      </div>
      
    </div>

            <div className='footer'>This website is in Development Phase.Stay tuned for updates.<p>For any suggestion Mail: <a href='vaibhavbhatt9666@gmail.com'>vaibhavbhatt9666@gmail.com</a></p></div>

    </div>

  )
}

export {user}
