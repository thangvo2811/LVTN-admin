import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "antd";
import axios from "axios";
import { message } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";

const AddOption = (props) => {
  const [open, setOpen] = React.useState(false);
  const [allProductOption, setAllProductOption] = useState([]);
  const [allOption, setAllOption] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [selectProduct, setSelectProduct] = useState("");
  const [selected, setSelected] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddOption = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-option-product`, {
        name: newName,
        price: newPrice,
        product_id: selectProduct,
        option_id: selected,
      })
      .then((res) => {
        if (res.data.errCode === 0) {
          console.log(res.data);
          props.parentCallback(Date.now());
          message.success("Thêm Thuộc Tính Thành Công");
          return;
        }
        if (res.data.errCode === 1) {
          message.error("Sản Phẩm Không Tồn Tại");
          return;
        }
        if (res.data.errCode === 2) {
          message.error("Thuộc Tính Không Tồn Tại");
          return;
        }
        if (res.data.errCode === 3) {
          message.error("Thuộc Tính Đã Tồn Tại");
          return;
        }
        if (res.data.errCode === 4) {
          message.error("Thuộc Tính Không Phù Hợp Với Sản Phẩm");
          return;
        }
      })

      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const callAllOption = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-option/`)
      .then((res) => {
        setAllOption(res.data.option);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callAllProduct = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-all-product-admin/?brand_id=&category_id=`
      )
      .then((res) => {
        setAllProductOption(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let productOption = allProductOption?.map((item, index) => {
    return { label: item.name, value: item.id };
  });

  useEffect(() => {
    callAllOption();
    callAllProduct();
  }, []);

  const handleProduct = (e) => {
    setSelectProduct(e.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Thêm Thuộc Tính</i>
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {<></>}
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div className="form-title">Thuộc Tính</div>
          <div className="form-input">
            <form>
              <label>Tên Sản Phẩm</label>
              <br />
              {/* <select
                // value={selectProduct}
                onChange={(e) => setSelectProduct(e.target.value)}
              >
                <option>Chọn Sản Phẩm</option>
                {allProductOption?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select> */}
              <Select
                // onChange={(e) => setSelectProduct(e.target.value)}
                className="basic-single"
                classNamePrefix="select"
                name="color"
                options={productOption}
                onChange={handleProduct}
              ></Select>
              <label>Danh Mục Thuộc Tính</label>
              <br />
              <select
                // value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option>Chọn Thuộc Tính</option>
                {allOption
                  ?.sort((a, b) => a.id - b.id)
                  .map((item, index) => (
                    <option key={index} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
              </select>

              <label>Tên Thuộc Tính</label>
              <Input
                type="text"
                placeholder="Tên Thuộc Tính"
                onChange={(e) => setNewName(e.target.value)}
              />

              <label>Giá</label>
              <Input
                type="number"
                placeholder="Giá"
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              handleAddOption(newName, newPrice, selectProduct, selected)
            }
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddOption;
