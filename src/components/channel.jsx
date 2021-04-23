import React, {useState,useEffect} from "react"
import firebase from 'firebase/app';

const Channel = ({user = null, db = null}) => {
    const [messages,setMessages] = useState([]);
    console.log(db)
    useEffect(() => {
        console.log("out")
       if(db){
        console.log("in")
       const unsubscribe = db
       .collection('messages')
       .orderBy('createdAt')
       .limit(100)
       .onSnapshot((querySnapshot) => {
        console.log("in snap",querySnapshot)
           //Get all documents fron collection - with IDs
           const data = querySnapshot.docs.map(doc => ({

               ...doc.data(),
               id: doc.id,
           }));
           //Update state
           setMessages(data);
       });


       
       return unsubscribe;
       
    }
    console.log(messages)
    }, [db])
    console.log(messages)
    return (
        <ul>
           {messages.map(message => (

               <li key={message.id}>{message.text}</li>
           ))
           
           } 
        </ul>
    )
}

export default Channel
