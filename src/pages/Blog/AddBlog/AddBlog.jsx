import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { message, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Backdrop, CircularProgress } from "@mui/material";
const AddBlog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [descBlog, setDescBlog] = useState("");
  const [nameBlog, setNameBlog] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const idCus = localStorage.getItem("admin");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddBlog = async (url) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-blog/`, {
        Description: descBlog,
        sta_id: idCus,
        name: nameBlog,
        img: url,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Thêm Bài Viết Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleUploadImageBlog = async () => {
    setIsLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/create-img-product`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          // setFile(file.secure_url);
          console.log(res?.data?.res?.url);
          handleAddBlog(res?.data?.res?.url);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
      setOpen(false);
    }
  };
  const handleDescBlog = (e) => {
    e.preventDefault();
    setDescBlog(e.target.value);
  };

  const handleNameBlog = (e) => {
    e.preventDefault();
    setNameBlog(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Thêm Bài Bài Viết</i>
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
          <div className="form-title">Thêm Bài Viết Mới</div>
          <div className="form-input">
            <form>
              <label>Name</label>
              <Input type="text" placeholder="Name" onChange={handleNameBlog} />
              <label>Mô tả</label>
              <TextArea
                rows="8"
                cols="500"
                type="text"
                placeholder="Mô tả"
                onChange={handleDescBlog}
              />

              <Input type="hidden" value={idCus} disabled />
              <label>Hình Ảnh</label>
              <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
              {file && <img src={URL.createObjectURL(file)} alt="" />}
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          {isLoading ? (
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <Button onClick={() => handleUploadImageBlog()}>Thêm</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBlog;
