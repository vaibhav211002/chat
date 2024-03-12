import React, { useEffect, useState } from 'react'
import './usercord.css'

const Usercord = ({data}) => {
    
  return (
    <div className='header2' >
        <div >User Joined</div>
        <ul className='text' id='userList'>
        {data.map((user, index) => (
          <li  className='text'  key={user._id}>
            {user.username}
          </li>
        ))}
      </ul>

    </div>



    

  )
}

export default Usercord