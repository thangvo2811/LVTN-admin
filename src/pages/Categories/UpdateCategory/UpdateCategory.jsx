import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "antd";
import axios from "axios";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";

const UpdateCategory = (props) => {
  const [open, setOpen] = React.useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const id = props.idcate;
  const parentID = props.parentIdCate;
  console.log(parentID);
  console.log(id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callUpdateCategory = async (
    idCate,
    nameCate,
    parentIdCate,
    descCate
  ) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-Category/`, {
        id: idCate,
        name: nameCate,
        parent_id: parentIdCate,
        description: descCate,
      })
      .then((res) => {
        if (res.data.category.errCode === 1) {
          message.error("Danh Mục Đã Tồn Tại");
          return;
        }
        console.log(res);
        props.parentCallback(Date.now());
        message.success("Cập nhật danh mục thành công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleNameCate = (e) => {
    e.preventDefault();
    setNameCategory(e.target.value);
  };

  const handleDescCate = (e) => {
    e.preventDefault();
    setNewDesc(e.target.value);
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
          <div className="form-title">Cập Nhật Danh Mục</div>
          <div className="form-input">
            <form>
              <label>Mã</label>
              <Input type="number" defaultValue={props.idcate} disabled />
              <label>Tên danh mục</label>
              <Input
                type="text"
                defaultValue={props.nameCate}
                onChange={handleNameCate}
              />
              <label>Mã Danh Mục</label>
              <Input type="number" defaultValue={props.parentIdCate} />
              <label>Mô Tả Danh Mục</label>
              <TextArea
                rows="4"
                cols="111"
                type="text"
                defaultValue={props.descCate}
                onChange={handleDescCate}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              callUpdateCategory(id, nameCategory, parentID, newDesc)
            }
          >
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateCategory;
