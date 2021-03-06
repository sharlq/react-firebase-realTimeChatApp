import React, {useState,useEffect} from "react"
import {Button,Card,CardContent,Typography} from "@material-ui/core"
import Channel from './components/channel'
import { auth,db } from "./firebase";
import firebase from "firebase/app"



function App() {
  const [user,setUser] = useState(()=>auth.currentUser);
  const [initializing,setInitializing] = useState(true);


  useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged(user => {
    if(user){
      setUser(user);
    }else{
      setUser(null);
    }
    if(initializing){
      setInitializing(false)
    }
  })
  return unsubscribe
},[])


  const signInWithGoogle = async () =>{
    // Retrive Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    //set language to the defult
    auth.useDeviceLanguage();
    //start sign in process
    try{
      await auth.signInWithPopup(provider)
    }catch(error){
      console.error(error);
    }

  }
const signOut = async () =>{
  try{
    await auth.signOut()
  }catch(error){
    console.log(error.message)
  }
}

  if (initializing) return 'Loading...'
  return (
    <Card className="card">
     
    {user ? (<>
    <div className="header">
    <Typography className="title" variant="h5" className="title">welcome to <strong>My Chat</strong> </Typography>
    <Button variant="contained" className="singOut-btn" color="primary" onClick={signOut}>Sign Out</Button>
    </div>
    <Channel user={user} db={db}/>
    </>
    ): (
    <Button variant="contained"  color="primary" onClick={signInWithGoogle}>Sign in</Button>)}
    </Card>
  );
}

export default App;
