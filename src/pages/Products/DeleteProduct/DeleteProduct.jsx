import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { message } from "antd";

const DeleteProduct = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProduct = async (e, id) => {
    e.preventDefault();
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/delete-product-soft/${id}/`)
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Xóa Sản Phẩm Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleDeleteProduct(e, props.item)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteProduct;
