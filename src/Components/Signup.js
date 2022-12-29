import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Alert from "@mui/material/Alert";
import "./Signup.css";
import instaa from "../Assets/insta.jpg";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../Context/AuthContext";
import { database, storage } from "./firebase";
//import { textAlign } from '@mui/system';
export default function Signup() {
  const { signup } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    text2: {
      height: "3vh",
      display: "flex",
      justifyContent: "center",
    },
  });

  const classes = useStyles();

  const signupHandler = async () => {
    if (file == null) {
      setError("Please upload profile image first");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try {
      setError("");
      setLoading(true);
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      //console.log(uid);

      //upload profile image in storage
      const uploadTask = storage.ref(`/users/${uid}/profileImage`).put(file);
      uploadTask.on("state_changed", fn1, fn2, fn3);

      // upload progress
      function fn1(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is  ${progress}  done`);
      }

      // if error
      function fn2(error) {
        //console.log("error", error);
        setError(error);
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
        return;
      }

      // success
      function fn3() {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullName: name,
            profileUrl: url,
            createdAt: database.getTimeStamp(),
          });
        });
        setLoading(false);
        //it takes user to specified path
        history.push("/");
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  };
  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={instaa} alt="" />
          </div>
          <CardContent>
            <Typography className={classes.text1} variant=" subtitle1">
              Sign up to see photos and videos from your friends.
            </Typography>
            {error != "" && <Alert severity="error">{error}</Alert>}
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Name"
              variant="outlined"
              margin="dense"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="dense"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              margin="dense"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              fullWidth
              component="label"
              disable={loading}
              startIcon={<CloudUploadIcon />}
            >
              Upload Profile Image
              <input
                type="file"
                accept="image/"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </Button>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              size="small"
              variant="contained"
              disabled={loading}
              onClick={signupHandler}
            >
              Sign up
            </Button>
          </CardActions>
          <CardContent>
            <Typography className={classes.text1} variant=" subtitle1">
              By signing up , you agree to our terms , data Policy and Cookies
              Policy.
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <Typography className={classes.text2} variant=" subtitle1">
            Having an account ?&nbsp;
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
