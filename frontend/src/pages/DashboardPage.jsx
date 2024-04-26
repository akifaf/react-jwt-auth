import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import profileImg from "../images/profile_01.png";
import { refreshAuthToken } from "../redux/AuthSlice";
import { useDispatch } from "react-redux";

function DashboardPage() {
  const { user_id } = jwtDecode(localStorage.getItem("authTokens")) || {};
  const [userData, setUserData] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const dispatch = useDispatch()
  console.log(dispatch(refreshAuthToken()))
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/profile/${user_id}/`
        );
        setUserData(response.data.user);
        setUserImg(response.data.user_img);

      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user_id, editMode]);
  
  const updateImage = async () => {
    
    console.log('image', userImg.name);
    const formData = new FormData();
    formData.append("profile_img", userImg,userImg.name);
    formData.append("user", userData.id)
    
    
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/profile/${user_id}/`,{
          method: 'POST',
          body: formData,
        }
      );
  
      if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    }
    setEditMode(false);
  };
  
  
  return (
    <Layout>
      <div className="container mt-4 d-flex justify-content-center">
        <div className="card border-primary" style={{ width: "25rem" }}>
          <img
            src={userImg ? userImg.profile_img : profileImg}
            className="card-img-top mx-auto d-block mt-2"
            alt="Profile"
            style={{ maxWidth: "30%", borderRadius: "50%" }}
          />
          {editMode && (
            <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e)=>setUserImg(e.target.files[0])}
          />
          )}
          
          {userData && (
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <p>
                Username: {userData.first_name} {userData.last_name}
              </p>
              <p>Email: {userData.email}</p>
              <p className="card-text">
                Some quick example text to display here.
              </p>
            </div>
          )}
          {editMode ? <button className="btn btn-secondary" onClick={()=>updateImage()}>Save</button> : 
          <button className="btn btn-secondary" onClick={toggleEditMode}>Edit</button>}
     
          
        </div>
      </div>

    </Layout>
  );
}

export default DashboardPage;
