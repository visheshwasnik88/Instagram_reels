
import React, { useContext, useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";
import { database, storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";
export default function UploadFile(props) {
  //console.log(props.user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const inputChangeHandler = async (file) => {
    
    if (file == null) {
      setError("Please select a file.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    // file ka size rhat hai bytes mai toh hum mbs mai convert karengy 100mb se bade file rahe toh mat upload kro.
    if (file.size / (1024 * 1024) > 100) {
      setError("File size is big");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    const uid = uuidv4();
    setLoading(true);
    const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on("state_changed", fn1, fn2, fn3);

    function fn1(snapshot) {
      // progress ki kitne hamare impage upload hore
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`upload is ${progress} done.`);
    }
    function fn2(error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      return;
    }
    function fn3() {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
       // console.log(url);
        let obj = {
          comments: [],
          likes: [],
          pId: uid,
          pUrl: url,
          uName: props.user.fullName,
          uProfile: props.user.profileUrl,
          userId: props.user.userId,
          createdAt: database.getTimeStamp(),
        };
        // ab hum yaha uid nahi dere because firestore khud uid denga
        //jo muze store bhi karne hai user k andahr
        database.posts.add(obj).then(async (ref) => {
          console.log(ref.id)
            let res = await database.users.doc(props.user.userId).update({
           
              postIds:props.user.postIds != null  ? [...props.user.postIds, ref.id]    : [ref.id],
            });
          }).then(() => {
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setTimeout(() => {
              setError("");
            }, 2000);
            setLoading(false);
          });
      });
      // setLoading(false);
    }
  };
  return (
    <div style={{marginTop:'5rem',marginBottom:'1rem'}}>
      {error != "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <input
            type="file"
            accept="video/*"
            id="upload-input"
            style={{ display: "none" }}
            onChange={(e)=>inputChangeHandler(e.target.files[0])}
          />
          <label htmlFor="upload-input">
            {/* &nbsp helps for space */}
            <Button 
            variant="outlined" 
            color="secondary"
            disabled={loading}
            component='span'>
              <MovieIcon />
              &nbsp;Upload video
            </Button>
          </label>
          {loading &&   <LinearProgress color="secondary" />}
        </>
      )}
    </div>
  );
}
