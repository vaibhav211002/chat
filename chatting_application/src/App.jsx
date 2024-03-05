import React from 'react'

import {BrowserRouter as Router , Route ,Routes} from "react-router-dom";
import { Joined } from './Components/Join/Join/Joined';
import Chat from './Components/Join/chat/chat';




function App() {

  // socket.on("connect",()=>{
  //   console.log('we are in the client');

  // })
  
  return (
    <div>
      <Router>
        <Routes>
        <Route exact path="/" Component={Joined} />
        <Route path="/chat" Component={Chat} />

        </Routes>
        
      </Router>
    </div>
  )
}

export default App