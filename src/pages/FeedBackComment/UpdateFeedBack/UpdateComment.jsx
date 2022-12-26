import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Input } from "antd";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";

const UpdateComment = (props) => {
  const [open, setOpen] = React.useState(false);

  const [newDesc, setNewDesc] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateComment = async () => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-comment-respone/`, {
        id: props.id,
        comment_id: props.idComment,
        description: newDesc,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Đánh Giá Thành Công");
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
          <div className="form-title">Cập Nhật Đánh Giá</div>
          <div className="form-input">
            <form>
              <label>ID</label>
              <Input type="number" value={props.id} disabled />
              <label>Mã Đánh Giá</label>
              <Input type="number" value={props.idComment} disabled />

              <label>Nội Dung Bình Luận</label>
              <TextArea
                rows="8"
                cols="500"
                type="text"
                placeholder="Mô Tả"
                defaultValue={props.descComment}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              handleUpdateComment(props.id, props.idComment, newDesc)
            }
          >
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateComment;
