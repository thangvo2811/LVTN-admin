import { loginFailure, loginStart, loginSuccess } from "./adminLogin";
import axios from "axios";
import { message } from "antd";

export const loginAdmin = async (dispatch, admin) => {
  dispatch(loginStart());
  await axios
    .post(`${process.env.REACT_APP_API_URL}/api/login-admin/`, admin)
    .then((res) => {
      if (res.data.errorCode === 0) {
        message.success("Đăng Nhập Thành Công");
        dispatch(loginSuccess());
        localStorage.setItem("admin", res.data.data.id);
        localStorage.setItem("role", res.data.data.role_id);
        localStorage.setItem("nameAdmin", res.data.data.fullname);
        window.location.href = "/";
      }
      if (!res.data.password || !res.data.email) {
        message.error("Sai Mật Khẩu Hoặc Email");
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(loginFailure());
    });
};
