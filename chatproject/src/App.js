import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBkbY_bt6TFYtvDB3vZ_aQidmwSlYM5Hg4",
  authDomain: "testchatproject-d3fd2.firebaseapp.com",
  projectId: "testchatproject-d3fd2",
  storageBucket: "testchatproject-d3fd2.appspot.com",
  messagingSenderId: "436647214680",
  appId: "1:436647214680:web:7dfdf78b5ffcca46e3d42d"

})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] =useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section>
        {user ? <ChatRoom/> :<Signin />}
      </section>
    </div>
  );
}

function Signin() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');
  
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid,photoURL } = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
  }

  return (
    <main>
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </div>
    <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />

        <button type="submit"></button>

      </form>
    
    </main>
  );
  
}
 
function ChatMessage(props) {
  const{ text, uid} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';


  return(
  <div className= {'message ${messageClass}'}>
      <img src={photoURL}/>
      <p>{text} </p>
  
  </div>
  )
  
}

export default App;
