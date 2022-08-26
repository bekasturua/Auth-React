import React, { useState, useEffect, useCallback } from "react";

let logoutTImer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expitationTime) => {
  const currentTime = new Date().getTime();
  const adjExpitationTime = new Date(expitationTime).getTime();

  const remaingDuration = adjExpitationTime - currentTime;

  return remaingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTIme");
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokendata = retrieveStoredToken();
  let initialToken;
  if (tokendata) {
    initialToken = tokendata.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiationTime");

    if (logoutTImer) {
      clearTimeout(logoutTImer);
    }
  }, []);

  const loginHandler = (token, expitationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expitationTime);

    const remainingTime = calculateRemainingTime(expitationTime);

    logoutTImer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokendata) {
      console.log(tokendata.duration);
      logoutTImer = setTimeout(logoutHandler, tokendata.duration);
    }
  }, [tokendata, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
