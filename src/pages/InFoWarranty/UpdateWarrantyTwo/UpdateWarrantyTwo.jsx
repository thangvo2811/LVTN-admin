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

const UpdateWarrantyTwo = (props) => {
  const warrantyItem = props.item;
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = useState("");
  const [newInFor, setNewInFor] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateWarranty = async () => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-warranty/`, {
        id: warrantyItem.id,
        name: warrantyItem.name,
        description: newInFor,
        infor: newDesc,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Đơn Thành Công");
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
              <Input type="number" value={warrantyItem.id} disabled />
              <label>Tên Sản Phẩm</label>
              <Input type="text" value={warrantyItem.name} disabled />
              <label>Thông Tin Bảo Hành</label>
              <Input
                type="text"
                defaultValue={warrantyItem.infor}
                onChange={(e) => setNewInFor(e.target.value)}
              />
              <label>Nội Dung Bảo Hành</label>
              <Input
                type="text"
                defaultValue={warrantyItem.description}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              handleUpdateWarranty(
                warrantyItem.id,
                warrantyItem.name,
                newDesc,
                newInFor
              )
            }
          >
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateWarrantyTwo;
