import React, { useState,useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/firebaseContext';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate} from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const {firestore}=useContext(FirebaseContext)

 const handleSubmit=(e)=>{
  e.preventDefault()
 
  const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      console.log('User created:', result.user);
      const docData = collection(firestore, 'users')
      const data = {
        id:result.user.uid,
        username:username,
        phone:phone
      };
      console.log('Firestore instance:', firestore);
      console.log('Data being added:', data);


      addDoc(docData, data, { merge: true }).then(response => {
        navigate('/login')
      }).catch(err => {
        console.log(err.message)
       
      })

    })
 }
 

  return (
    <div>
      <div className="signupParentDiv">
      <img width="200px" height="200px" src={Logo} alt="OLX Logo" />

        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href="/login">Login</a>

      </div>
    </div>
  );
}
