import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { message } from "antd";
import axios from "axios";

const DeleteOrder = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteOrder = async (id) => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/delete-order-by-Oder-id/${id}/`
      )
      .then((res) => {
        console.log(res.data);
        message.success("Xóa Đơn Hàng Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <i className="bx bx-trash"></i>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>Bạn có muốn xóa không ?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={() => handleDeleteOrder(props.idOrder)}>Xóa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteOrder;
