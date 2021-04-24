import React from 'react'
import {formatRelative} from 'date-fns'
import {Paper} from '@material-ui/core';
const Message = ({
    createdAt = null,
    text="",
    displayName="",
    photoURL="",
}) => {
    return (
        <div  className="message">
            {photoURL ? 
            (<img src={photoURL} alt="Avatar" className="message-img"/>)
            :
            null}
            <Paper elevation={3} className="message-paper">
            {displayName? <p className="message-name">{displayName}</p>:null}
            <p className="message-text">{text}</p>
            {createdAt?.seconds ? 
            (<spain className="message-time">{formatRelative(new Date(createdAt.seconds * 1000), new Date())}</spain>)
            :
            null}
            </Paper>
        </div>
    )
}

export default Message
