import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Input } from "antd";
import { message } from "antd";
import { useState } from "react";

const UpdateBranch = (props) => {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const id = props.idBranch;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callUpdateBranch = async () => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-warehouse/`, {
        id: id,
        name: newName,
        address: newAddress,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Chi Nhánh Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
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
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div className="form-title">Cập Nhật Danh Mục</div>
          <div className="form-input">
            <form>
              <label>Id</label>
              <Input type="number" defaultValue={props.idBranch} disabled />
              <label>Tên Chi Nhánh</label>
              <Input
                type="text"
                defaultValue={props.nameBranch}
                onChange={(e) => setNewName(e.target.value)}
              />
              <label>Địa Chỉ</label>
              <Input
                type="text"
                defaultValue={props.addressBranch}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={() => callUpdateBranch(id, newName, newAddress)}>
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateBranch;
