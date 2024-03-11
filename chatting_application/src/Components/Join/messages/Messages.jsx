import React from 'react'
import './message.css'

const Messages = ({user , message, cls}) => {
    console.log("user name " , user);
    if(user){

        if(user=='Admin'){
            return(
                <div className={`messageBox hell`}>
                {`${user} : ${message} from admin`}
            </div>
            )

        }
        else{
            return(
                <div className={`messageBox ${cls}`}>
                {`${user} : ${message}`}
            </div>
            )

        }


    }
    return(
            <div className={`messageBox ${cls} yo`}>
            {` You : ${message}`}
        </div>
        )




}

export default Messages