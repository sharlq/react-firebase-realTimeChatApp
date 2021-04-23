import React, {useState,useEffect} from "react"
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Signup from "./components/signup"
import {Button} from "@material-ui/core"
import Channel from './components/channel'
// import fire base
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
//import { auth } from "./firebase";

let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY ,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
  projectId: process.env.REACT_APP_PROJECT_ID ,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID ,
  appId: process.env.REACT_APP_APP_ID
};
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth();
 const db = firebase.firestore();

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
    <div>
     {/* <Router >
       <Switch>
         <Route path="/" component={Signup}/
       </Switch>
     </Router> */}
    {user ? (<>
    <Button variant="contained" color="primary" onClick={signOut}>Sign Out</Button>
    <Channel user={user} db={db}/>
    </>
    ): (<Button variant="contained" color="primary" onClick={signInWithGoogle}>Sign in</Button>)}
    
    </div>
  );
}

export default App;
