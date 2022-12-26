import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, message, Select, Upload } from "antd";

import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { Backdrop, CircularProgress } from "@mui/material";
import { Option } from "antd/es/mentions";

const AddProduct = (props) => {
  const [open, setOpen] = React.useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);
  const [nameProduct, setNameProduct] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(allBrand[0]);
  const [selectedCate, setSelectedCate] = useState(allCategory[0]);
  const [priceProduct, setPriceProduct] = useState("");
  const [descProduct, setDescProduct] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callAddProduct = async (url) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-Product/`, {
        name: nameProduct,
        unitprice: priceProduct,
        Description: descProduct,
        brand_id: selectedBrand,
        category_id: selectedCate,
        img: url,
      })
      .then((res) => {
        if (res.data.product.errCode === 1) {
          message.error("Sản Phẩm Đã Tồn Tại");
          return;
        }
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Thêm Sản Phẩm Thành Công");
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
          callAddProduct(res?.data?.res?.url);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
      setOpen(false);
    }
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
        <div className="form-name">
          <i className="bx bx-plus">Thêm Sản Phẩm</i>
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
          <div className="form-title">Sản Phẩm Mới</div>
          <div className="form-input">
            <form>
              <label>Tên Sản Phẩm</label>
              <Input
                type="text"
                placeholder="Name"
                onChange={(e) => setNameProduct(e.target.value)}
              />
              <label>Tên Danh Mục</label>
              <br />
              <select onChange={(e) => setSelectedCate(e.target.value)}>
                <option>Chọn Danh Mục</option>
                {allCategory?.map((item, index) =>
                  item.ChildrenCategoty?.map((data, i) => (
                    <option key={index} value={data.id}>
                      {data.name}
                    </option>
                  ))
                )}
              </select>
              {/* <select
                // value={selectedCate}
                onChange={(e) => setSelectedCate(e.target.value)}
              >
                <option>Chọn Danh Mục</option>
                {allCategory?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item.name}
                  </option>
                ))}
              </select> */}
              <br />
              <label>Tên Thương Hiệu</label>
              <br />
              <select
                // value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option>Chọn Thương Hiệu</option>
                {allBrand?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <label>Giá</label>
              <Input
                type="number"
                placeholder="Giá"
                step="0"
                onChange={(e) => setPriceProduct(e.target.value)}
              />
              <label>Mô Tả</label>
              <TextArea
                rows="8"
                cols="500"
                type="text"
                placeholder="Mô Tả"
                onChange={(e) => setDescProduct(e.target.value)}
              />
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
            <Button
              onClick={() => {
                handleUploadImage();
              }}
            >
              Thêm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
