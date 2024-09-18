
import React from 'react';
import { useEffect,useState,useContext } from 'react';
import './View.css';
import { postContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/firebaseContext';
import { collection, query, where, getDocs } from "firebase/firestore";
function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(postContext)
  const {firestore} = useContext(FirebaseContext)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { userId } = postDetails;
        const q = query(collection(firestore, "users"), where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);
 
  
  return (
    <div className="viewParentDiv">
      {postDetails && (
        <>
          <div className="imageShowDiv">
            <img
              src={postDetails.url}
              alt=""
            />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9; {postDetails.price} </p>
              <span>{postDetails.name}</span>
              <p>{postDetails.category}</p>
              <span>{postDetails.createdAt}</span>
            </div>
            {userDetails && (
              <div className="contactDetails">
                <p>Seller details</p>
                <p>{userDetails.username}</p>
                <p>{userDetails.phone}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
  
}
export default View;
