
import React,{useEffect,useContext,useState} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/firebaseContext';
import { firestore } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { postContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const navigate = useNavigate()
const {firebase} = useContext(FirebaseContext)
const [products,setProducts] = useState([]);
const {setPostDetails} = useContext(postContext)
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Products'));
      const allProducts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setProducts(allProducts);
      console.log(allProducts)
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  fetchProducts();
}, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product=>{

          
          return <div
            className="card"
            onClick={()=>{
              setPostDetails(product)
              navigate('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div> })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
