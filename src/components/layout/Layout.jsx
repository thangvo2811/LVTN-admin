import React, { useEffect } from "react";

import "../../scss/index.scss";

import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import Routes from "../../routers/Routes";

import { BrowserRouter, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import ThemeAction from "../../redux/actions/ThemeAction";
import Login from "../../pages/Login/Login";

const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);
  // const router = useParams();
  const queryString = window.location.pathname;
  // console.log(queryString);
  return (
    <>
      {queryString === "/login" ? (
        <Login />
      ) : (
        <BrowserRouter>
          <Route
            render={(props) => (
              <>
                <div
                  className={`layout class-sdad ${themeReducer.mode} ${themeReducer.color}`}
                >
                  <Sidebar {...props} />
                  <div className="layout__content">
                    <TopNav />
                    <div className="layout__content-main">
                      <Routes />
                    </div>
                  </div>
                </div>
              </>
            )}
          />

          {/* <Route path="/" exact component={Login} /> */}
        </BrowserRouter>
      )}
    </>
  );
};

export default Layout;
