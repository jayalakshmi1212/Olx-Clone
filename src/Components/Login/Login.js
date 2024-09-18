import React,{useState,useContext} from 'react';
import { FirebaseContext } from '../../store/firebaseContext';
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email,setEmail]= useState('');
  const [password,setPassword] = useState('');
  const {firestore} = useContext(FirebaseContext)
  const handleLogin = (e)=>{
    e.preventDefault();
    const auth = getAuth();
    console.log('auth,,,,,,',auth);
    signInWithEmailAndPassword(auth, email, password).then(()=>{
      // alert('Logged In')
      navigate('/')
    }).catch((err)=>{
      alert(err.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to={'/signup'}>Sign In</Link>
      </div>
    </div>
  );
}

export default Login;