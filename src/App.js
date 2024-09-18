
import React, { useEffect, useContext } from 'react';
import './App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext, FirebaseContext } from './store/firebaseContext';
import Post from './store/PostContext';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login'
import Create from './Pages/Create';
import View from './Pages/ViewPost';

function App() {
  const { setUser } = useContext(AuthContext)
  const { firestore } = useContext(FirebaseContext)
  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)

        const uid = user.uid;
        console.log('uid', uid)

      } else { 
        console.log("error");

      }
      console.log('name::', user)

    })
  },[])
  return (
    <div>
      <Post>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View />} />
        </Routes>
       
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
