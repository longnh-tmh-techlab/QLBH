import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductListPage from "pages/ProductListPage";
import LoginPage from "pages/LoginPage";
import axios from "axios";
import Cookies from "js-cookie";

type Props = {
  path: string;
  children: React.ReactNode;
};
const CustomerAuth: React.FC<Props> = ({ path, children }) => {
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const position = Cookies.get("position");
  useEffect(() => {
    const checkLogged = async () => {
      const email = Cookies.get("email");
      if (!email) {
        setIsAuth(true);
        setIsLoading(false);
      } else {
        const formData = new FormData();
        formData.append("email", email);
        const result = await axios.post(
          `${process.env.REACT_APP_SERVER}users/auth`,
          formData,
          { withCredentials: true }
        );
        console.log(result.data.isAuth);
        if (result.data.isAuth && position === "3") {
          setIsAuth(true);
          setIsLoading(false);
        } else {
          setIsAuth(false);
          setIsLoading(false);
        }
      }
    };
    checkLogged();
  }, []);
  if (isLoading) {
    return <></>;
  }
  if (isAuth) {
    return (
      <Route path={path} exact>
        {children}
      </Route>
    );
  }
  return <Redirect to="login" />;
};

export default CustomerAuth;
