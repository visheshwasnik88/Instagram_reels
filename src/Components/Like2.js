import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { database } from "./firebase";
function Like2({ userData, postData }) {
  //console.log(postData)
  const [like, setLike] = useState(null);
  useEffect(() => {
    let check = postData.likes.includes(userData.userId) ? true : false;
    setLike(check);
  }, [postData]);

  const handleClick = () => {
    if (like == true) {
      let narr = postData.likes.filter((elements) => elements != userData.userId);
      database.posts.doc(postData.postId).update({
        likes: narr,
      });
    } else {
      let narr = [...postData.likes, userData.userId];
      database.posts.doc(postData.postId).update({
        likes: narr,
      });
    }
  };
  return (
    <div>
      {like != null ? (
        <>
          {like == true ? (
            <FavoriteIcon
              style={{padding:'1rem'}}
              className={"like"}
              onClick={handleClick}
            />
          ) : (
            <FavoriteIcon
            style={{padding:'1rem'}}
              className={"unlike2"}
              onClick={handleClick}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Like2;
