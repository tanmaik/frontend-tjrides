import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";

import AuthScreen from "./auth/AuthScreen";
import HomeScreen from "./home/HomeScreen";
import RiderScreen from "./home/RiderScreen";
import DriverScreen from "./home/DriverScreen";
import ConfirmedRide from "./home/ConfirmedRide";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = useCallback((data) => {
    setIsLoggedIn(true);
    setUserData(data);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserData(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/afterAuth"></Route>
        <Route path="/" exact>
          <HomeScreen />
        </Route>
        <Route path="/rider" exact>
          <RiderScreen />
        </Route>
        <Route path="/driver" exact>
          <DriverScreen />
        </Route>
        <Route path="/confirmedRide/:rideId">
          <ConfirmedRide />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact>
          <AuthScreen />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userData: userData,
        login: login,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
