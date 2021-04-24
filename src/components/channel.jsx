import React, {useState,useEffect} from "react"
import firebase from 'firebase/app';
import Message from './message'

const Channel = ({user = null, db = null}) => {
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage]=useState();
    const {uid , displayName, photoURL} = user;
    useEffect(() => {
       if(db){
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
           // note the problem here was that i didnt give the server teh preimition to reade adn write data from firebases
       });
       return unsubscribe;
    }
    
    }, [db])


    const handleOnChange = (e) =>{
            setNewMessage(e.target.value)
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        if(db){
            db.collection("messages").add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
        setNewMessage("")
    }
    console.log(messages)
    return (
        <>
        <ul>
           {messages.map(message => (

               <li key={message.id}> <Message {...message}/> </li>
           ))
           
           } 
        </ul>
        <form onSubmit={(e)=>handleOnSubmit(e)} >
            <input type="text" value={newMessage} onChange={(e)=>handleOnChange(e)} />
            <button>send message</button>
        </form>
        </>
    )
}

export default Channel
