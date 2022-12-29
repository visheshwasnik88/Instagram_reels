import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { database } from "./firebase";
import Navbar from "./Navbar";
import Posts from "./Posts";
import UploadFile from "./UploadFile";
function Feed() {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    //Database object
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      //console.log(snapshot.data())
      setUserData(snapshot.data());
    });
    return () => {
      unsub();
    };
  }, [user]);
  //console.log(userData)
  return (
    <>
    <Navbar user={userData} logout={logout}/>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

      }}
    >
      {/* <div className="comp" style={{ width: "50%" }}>
        <h1>Welcome to feed</h1>
        <button onClick={logoutHandler}>Logout</button>
      </div> */}
      <UploadFile user={userData} />
      <Posts user={userData} />
    </div>
    </>);
}

export default Feed;