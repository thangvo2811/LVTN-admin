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

const UpdateVoucher = (props) => {
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = useState("");
  const [newDateStart, setNewDateStart] = useState("");
  const [newDateEnd, setNewDateEnd] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateVoucher = async () => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-event/`, {
        id: props.idVoucher,
        name: newName,
        datestart: newDateStart,
        dateend: newDateEnd,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Voucher Thành Công");
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
          <div className="form-title">Cập Nhật Voucher</div>
          <div className="form-input">
            <form>
              <label>ID</label>
              <Input type="number" value={props.idVoucher} disabled />
              <label>Tên voucher</label>
              <Input
                type="text"
                defaultValue={props.nameVoucher}
                onChange={(e) => setNewName(e.target.value)}
              />
              <label>Ngày Bắt Đẩu</label>
              <Input
                type="date"
                defaultValue={props.dateStart}
                onChange={(e) => setNewDateStart(e.target.value)}
              />
              <label>Ngày Kết Thúc</label>
              <Input
                type="date"
                defaultValue={props.dateEnd}
                onChange={(e) => setNewDateEnd(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              handleUpdateVoucher(
                props.idVoucher,
                newName,
                newDateStart,
                setNewDateEnd
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

export default UpdateVoucher;
