import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Input } from "antd";
import { message } from "antd";

const UpdateBrand = (props) => {
  const [open, setOpen] = React.useState(false);
  const [nameBrand, setNameBrand] = useState("");
  const id = props.id;
  console.log(id);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateBrand = async (id, name) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-brand`, {
        id: id,
        name: name,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Thương Hiệu Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const onChange = (e) => {
    e.preventDefault();
    setNameBrand(e.target.value);
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
              <Input type="number" defaultValue={props.id} disabled />
              <label>Tên thương hiệu</label>
              <Input
                type="text"
                defaultValue={props.name}
                onChange={onChange}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={() => handleUpdateBrand(id, nameBrand)}>
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateBrand;
