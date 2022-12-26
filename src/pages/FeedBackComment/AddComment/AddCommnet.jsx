import React, { useEffect, useState } from "react";
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

const AddCommnet = (props) => {
  const [open, setOpen] = React.useState(false);
  const [allCommentUser, setAllCommentUser] = useState([]);
  const [selectComment, setSelectComment] = useState("");
  const [descComment, setDescComment] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const callAllCommentUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-comment/`)
      .then((res) => {
        setAllCommentUser(res.data.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllCommentUser();
  }, []);

  const handleFeedBack = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-comment-response/`, {
        comment_id: selectComment,
        description: descComment,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Thêm Đánh Giá Thành Công");
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
          <i className="bx bx-plus">Phản Hồi</i>
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
          <div className="form-title">Phản Hồi Bình Luận</div>
          <div className="form-input">
            <form>
              <label>Nội Dung</label>
              <select onChange={(e) => setSelectComment(e.target.value)}>
                {allCommentUser?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </select>
              <label>Phản Hồi Bình Luận</label>
              <TextArea
                rows="8"
                cols="500"
                type="text"
                placeholder="Mô Tả"
                onChange={(e) => setDescComment(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={() => handleFeedBack(selectComment, descComment)}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCommnet;
