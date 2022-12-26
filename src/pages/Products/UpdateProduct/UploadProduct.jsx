import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import "../style.scss";
import { Input, message } from "antd";
import Item from "antd/es/list/Item";
import TextArea from "antd/es/input/TextArea";
import { Backdrop, CircularProgress } from "@mui/material";

const UploadProduct = (props) => {
  const id = props.id;
  const [open, setOpen] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);
  const [newName, setNewName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(allBrand[0]);
  const [selectedCate, setSelectedCate] = useState(allCategory[0]);
  const [newPrice, setNewPrice] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateProduct = async (url) => {
    console.log(url);
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-Product/`, {
        id: id,
        name: newName,
        unitprice: newPrice,
        brand_id: selectedBrand,
        category_id: selectedCate,
        img: url,
        Description: newDesc,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Sản Phẩm Thành Công");
        return;
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleUploadImage = async () => {
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
          handleUpdateProduct(res?.data?.res?.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsLoading(false);
    setOpen(false);
  };
  const callAllCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-Category/`)
      .then((res) => {
        setAllCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callAllBrand = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-brand/`)
      .then((res) => {
        setAllBrand(res.data.brand);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllCategory();
    callAllBrand();
  }, []);
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
        {" "}
        <DialogTitle id="alert-dialog-title"> </DialogTitle>
        <DialogContent>
          <div className="form-title">Cập Nhật Sản Phẩm </div>
          <div className="form-input">
            <form>
              <label>ID</label>
              <Input type="number" value={props.id} disabled />
              <label>Tên sản phẩm</label>
              <Input
                type="text"
                defaultValue={props.nameProduct}
                onChange={(e) => setNewName(e.target.value)}
              />
              <label>Tên Danh Mục</label>
              <br />
              <select onChange={(e) => setSelectedCate(e.target.value)}>
                <option>{props.nameCate}</option>
                {allCategory?.map((item, index) =>
                  item.ChildrenCategoty?.map((data, i) => (
                    <option key={index} value={data.id}>
                      {data.name}
                    </option>
                  ))
                )}
              </select>
              <br />
              <label>Tên Thương Hiệu</label>
              <br />
              <select
                // value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option>{props.nameBrand}</option>
                {allBrand?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <label>Giá</label>
              <Input
                type="number"
                defaultValue={props.price}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <label>Mô Tả</label>
              <TextArea
                rows="8"
                cols="500"
                defaultValue={props.descProduct}
                onChange={(e) => setNewDesc(e.target.value)}
              />
              <label>Hình Ảnh</label>
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              ></Input>
              {file && <img src={URL.createObjectURL(file)} alt="" /> ? (
                file && <img src={URL.createObjectURL(file)} alt="" />
              ) : (
                <img src={props.imgProduct} alt="" />
              )}
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
            <Button
              onClick={() => {
                handleUploadImage();
              }}
            >
              Cập Nhật
            </Button>
          )}
          {/*  */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadProduct;
