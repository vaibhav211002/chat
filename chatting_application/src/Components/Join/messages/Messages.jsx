import React from 'react'
import './message.css'

const Messages = ({user , message, cls}) => {

    if(user){
        return(
            <div className={`messageBox ${cls}`}>
            {`${user} : ${message}`}
        </div>
        )

    }
    return(
            <div className={`messageBox ${cls}`}>
            {` You : ${message}`}
        </div>
        )




}

export default Messages