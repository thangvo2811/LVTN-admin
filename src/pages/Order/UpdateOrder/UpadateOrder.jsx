import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, message } from "antd";
import axios from "axios";

const UpadateOrder = (props) => {
  const [open, setOpen] = React.useState(false);
  const status = props.statusOrder;

  const handleUpdateOrder1 = async (id) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-accept-order/${id}/`)
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập nhật trạng thái đơn hàng thành công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleUpdateOrder2 = async (id) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-order-status-3/${id}/`)
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập nhật trạng thái đơn hàng thành công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };

  const handleUpdateOrder3 = async (id) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-order-status-4/${id}/`)
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập nhật trạng thái đơn hàng thành công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };

  console.log("asdasdadas", status);
  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    if (status === 1) {
      handleUpdateOrder1(props.idOrder);
      props.parentCallback(Date.now());
      return;
    }
    if (status === 2) {
      handleUpdateOrder2(props.idOrder);
      props.parentCallback(Date.now());
      return;
    }
    if (status === 3) {
      handleUpdateOrder3(props.idOrder);
      props.parentCallback(Date.now());
      return;
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <i className="bx bxs-edit"></i>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogContent>
          <div className="form-title">Xác Nhận Đơn Hàng</div>
          <div className="form-input"></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleUpdateOrder}>Xác Nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpadateOrder;
