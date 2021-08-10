import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./pages/Home";

import PrivateRoute from "./utils/HOC/PrivateRoute";
import { Login, SignUp } from "./pages";
import { useAppDispatch } from "redux_tk";
import { autoLogin } from "redux_tk";
import { useAuth } from "utils/hooks/useAuth";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAuth();

  // if reload happends authenticate user
  if (isAuthenticated) {
    dispatch(autoLogin());
  }

  return (
    <Router>
      {/* <div className={classes.root}> */}
        <CssBaseline />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <PrivateRoute component={Home} path="/home" exact />
          <Route component={Login} path="/login" />
          <Route component={SignUp} path="/signUp" />
        </Switch>
      {/* </div> */}
    </Router>
  );
};
export default App;
