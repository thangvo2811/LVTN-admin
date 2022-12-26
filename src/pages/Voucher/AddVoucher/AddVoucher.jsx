import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "antd";
import axios from "axios";
import { message } from "antd";
import { useState } from "react";
const AddVoucher = (props) => {
  const [open, setOpen] = React.useState(false);
  const [nameVoucher, setNameVoucher] = useState("");
  const [startVoucher, setStartVoucher] = useState("");
  const [endVoucher, setEndVoucher] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddVoucher = async (name, dateStart, dateEnd) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-event/`, {
        name: name,
        datestart: dateStart,
        dateend: dateEnd,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Thêm Voucher Thành Công");
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
          <i className="bx bx-plus">Thêm Voucher</i>
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
          <div className="form-title">Voucher</div>
          <div className="form-input">
            <form>
              <label>Tên Voucher</label>
              <Input
                type="text"
                placeholder="Tên Thuộc Tính"
                onChange={(e) => setNameVoucher(e.target.value)}
              />
              <label>Ngày Bắt Đầu</label>
              <Input
                type="date"
                onChange={(e) => setStartVoucher(e.target.value)}
              />
              <label>Ngày Kết Thúc</label>
              <Input
                type="date"
                onChange={(e) => setEndVoucher(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              handleAddVoucher(nameVoucher, startVoucher, endVoucher)
            }
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVoucher;
