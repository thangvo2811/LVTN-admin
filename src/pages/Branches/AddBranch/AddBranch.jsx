import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Input } from "antd";
import { message } from "antd";
import axios from "axios";

const AddBranch = (props) => {
  const [open, setOpen] = useState(false);
  const [nameBranch, setNameBranch] = useState("");
  const [addressBranch, setAddressBranch] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callAddBranch = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-warehouse/`, {
        address: addressBranch,
        name: nameBranch,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Thêm Chi Nhánh Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Thêm Chi Nhánh</i>
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div className="form-title">Chi Nhánh</div>
          <div className="form-input">
            <form>
              <label>Tên Chi Nhánh</label>
              <Input
                type="text"
                placeholder="Name"
                onChange={(e) => setNameBranch(e.target.value)}
              />
              <label>Địa Chỉ</label>
              <Input
                type="text"
                placeholder="Địa Chỉ"
                onChange={(e) => setAddressBranch(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>

          <Button onClick={() => callAddBranch(addressBranch, nameBranch)}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBranch;
