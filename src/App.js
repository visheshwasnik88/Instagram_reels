import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Feed from "./Components/Feed";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Components/Profile";
import Observer from "./Components/Observer";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/profile/:id" component={Profile}/>
          <PrivateRoute path="/" component={Feed} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
    //<Observer/>
  );
}

export default App;
