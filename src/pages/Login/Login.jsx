import { Button, Input } from "antd";
import React, { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";

import { loginAdmin } from "../../redux/reducers/apiCall";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useHistory();
  const isLoggin = localStorage.getItem("admin");

  const handleLogin = (e) => {
    e.preventDefault();
    const newAdmin = { email: email, password: password };
    loginAdmin(dispatch, newAdmin);
    // window.history.push("/");
    // window.history.pushState("nextState", "nextTitle", "/");
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">Đăng nhập</div>
        <div className="login__content">
          <form>
            <div className="form-input">
              <label>Email</label>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Mật Khẩu</label>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" onClick={handleLogin}>
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
