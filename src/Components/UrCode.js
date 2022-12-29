import React, { Fragment, useEffect, useState } from "react";
import { database } from "./firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import "./Posts.css";
import Video from "./Video";
import Like from "./Like";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
//import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
//import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Like2 from "./Like2";
import AddComment from "./AddComment";
import Comments from "./Comment";
export default function Posts(props) {
  // console.log(props.user)
  const userData = props.user;
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    let parr = [];
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        parr = [];
        //console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });
        setPosts(parr);
      });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => {
            return (
              <Fragment key={index}>
                <div className="videos" style={{ width: "50vw" }}>
                  <Video src={post.pUrl} />
                  <div className="fa" style={{ display: "flex" }}>
                    <Avatar src={userData.profileUrl} />
                    <h4>{userData.fullName}</h4>
                  </div>
                  <Like userData={userData} postData={post} />
                  <ChatBubbleIcon
                    className="chat-styling"
                    onClick={() => {
                      handleClickOpen(post.pId);
                    }}
                  />
                  <Dialog
                    open={open == post.pId}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth="md"
                  >
                    <div className="modal-container">
                      <div className="videos-container">
                        <video autoPlay controls muted="muted">
                          <source src={post.pUrl} />
                        </video>
                      </div>
                      <div className="comment-container">
                        <Card className="card1" style={{ padding: "1rem" }}>
                          <Comments postData={post} />
                        </Card>
                        <Card variant="outlined">
                          <Typography style={{ padding: "1rem" }}>
                            {post.likes.length == 0
                              ? "Liked by nobody"
                              : `Liked by ${post.likes.length} users`}
                          </Typography>
                          <div style={{ display: "flex" }}>
                            <Like2
                              postData={post}
                              userData={userData}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            />
                            <AddComment postData={post} userData={userData} />
                          </div>
                        </Card>
                      </div>
                    </div>
                  </Dialog>
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
