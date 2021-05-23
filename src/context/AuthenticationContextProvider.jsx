import { useState } from "react";
import { AuthenticationContext, isAuthenticated } from "../service/auth";

export default function AuthenticationContextProvider(props) {
  const [isLoggedIn, handleLoggedIn] = useState(isAuthenticated());

  const setIsLoggedIn = (val) => {
    handleLoggedIn(val);
  };

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}
