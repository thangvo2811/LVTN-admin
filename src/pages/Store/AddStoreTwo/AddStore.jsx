import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";

const AddStore = (props) => {
  const [open, setOpen] = React.useState(false);
  const [allWareHouse, setAllWareHouse] = useState([]);

  const [quantity, setQuantity] = useState("");
  const [selected, setSelected] = useState("");

  const [allProduct, setAllProduct] = useState([]);
  const [selectProduct, setSelectProduct] = useState("");

  const [allOption, setAllOption] = useState([]);
  const [selectOption, setSelectOption] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let productOption = allProduct?.map((item, index) => {
    return { label: item.name, value: item.id };
  });
  const callAllProduct = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-all-product-admin/?brand_id=&category_id=`
      )
      .then((res) => {
        setAllProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callAllOption = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-product/${id}/`)
      .then((res) => {
        setAllOption(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllProduct();
    callAllOption(selectProduct, selectOption);
  }, [selectOption, selectProduct]);
  console.log("ID PRODUCT", selectProduct);
  console.log("Array", selectOption);

  const handleAddWareHouse = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-warehouse-product/`, {
        product_id: selectProduct,
        warehouse_id: selected,
        quantity: quantity,
        optionvalue: selectOption,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Đã Thêm Sản Phẩm Trong Kho");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const callAllWareHouse = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-warehouse/`)
      .then((res) => {
        setAllWareHouse(res.data.Warehouse);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllWareHouse();
  }, []);

  const handleProduct = (e) => {
    console.log("eeeeeeeeee", e.value);
    setSelectProduct(e.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Thêm Sản Phẩm Kho</i>
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
          <div className="form-title">Thêm Sản Phẩm Kho</div>
          <div className="form-input">
            <form>
              <label>Tên Sản Phẩm</label>
              <br />
              {/* <select
                value={selectProduct}
                onChange={(e) => {
                  setSelectProduct(e.target.value);
                }}
              >
                <option>Chọn Sản Phẩm</option>
                {allProduct?.map((item, index) => (
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

              {allOption?.existingOptions?.map((item, index) => {
                return (
                  <>
                    <label>Thuộc Tính {item.name}</label>
                    <select
                      // value={selectOption}
                      onChange={(e) => {
                        let newOption = selectOption;
                        newOption.push(e.target.value);
                        console.log("newOption", newOption);
                        setSelectOption(newOption);
                      }}
                    >
                      <option value={item.id}>Chọn {item.name}</option>
                      {item?.values?.map((data, i) => (
                        <option key={i.value} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                  </>
                );
              })}
              <label>Tên Kho</label>
              <br />
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option>Chọn Kho</option>
                {allWareHouse?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <label>Số Lượng</label>
              <Input
                type="number"
                placeholder="Số Lượng"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              handleAddWareHouse(
                selectProduct,
                selected,
                quantity,
                selectOption
              )
            }
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddStore;
