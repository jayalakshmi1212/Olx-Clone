import React, { Fragment, useContext, useState, } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseContext, AuthContext } from '../../store/firebaseContext';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const navigate = useNavigate()
  const { firestore } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setprice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();
  const handleSubmit = () => {
    
    const storage = getStorage();
    const storageRef = ref(storage, `/image/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async(url)=>{
        console.log('url...',url)
        await addDoc(collection(firestore,'Products'),{
          name,
          category,
          price,
          url,
          userId : user.uid,
          createdAt:date.toDateString()
        }).then(()=>{
          navigate('/')
        })
      }).catch((err)=>{
        console.log(err.message)
      })
      console.log('Uploaded an array!');
    });
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              name="Name"
              onChange={(e) => setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" value={price} type="number" id="fname" name="Price" onChange={(e) => setprice(e.target.value)} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

          <br />
          <input onChange={(e) => {
            setImage(e.target.files[0])
          }} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;