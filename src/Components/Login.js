import  React,{useState} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import img1 from "../Assets/img1.png";
import img2 from "../Assets/img2.png";
import img3 from "../Assets/img3.png";
import "./Login.css";
import bg from "../Assets/bg.png";
import insta from "../Assets/insta.jpg";
import { makeStyles } from "@mui/styles";
//import { textAlign } from '@mui/system';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
export default function Signup() {
  //const {login} = useContext(AuthContext);
 // console.log(store);
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
    text3: {
      textAlign: "center",
    },
  });

  const classes = useStyles();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] =useState(false);
  const history = useHistory();
  const handleClick = async () => {
    try{
        setError('');
        setLoading(true)
        let res = await login(email,password);
        console.log(res)
        setLoading(false);
        history.push('/')
    }catch(err){
        setError(err);
        setTimeout(()=>{
            setError('')
        },2000);
        setLoading(false);
    }
  }
  return (
    <div className="loginWrapper">
      <div
        className="imgcar"
        style={{ backgroundImage: "url(" + bg + ")", backgroundSize: "cover" }}
      >
        <div className="car">
          <CarouselProvider
            visibleSlides={1}
            naturalSlideWidth={100}
            naturalSlideHeight={173}
            totalSlides={3}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Image src={img1}></Image>
              </Slide>
              <Slide index={1}>
                <Image src={img2}></Image>
              </Slide>
              <Slide index={2}>
                <Image src={img3}></Image>
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className="loginCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            {error != "" && <Alert severity="error">{error}</Alert>}
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography color="primary" className={classes.text3}>
              Forget Password ?
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              size="small"
              variant="contained"
              onClick={handleClick}
              disabled={loading}
            >
              Login
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined">
          <Typography className={classes.text2} variant=" subtitle1">
            Don't have a account ?&nbsp;
            <Link to="/signup" style={{ textDecoration: "none" }}>
              {" "}
              Signup
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}