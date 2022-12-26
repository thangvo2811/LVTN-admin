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
import Select from "react-select";

const AddOrder = (props) => {
  const [open, setOpen] = React.useState(false);
  const [phoneCus, setPhoneCus] = useState("");
  const [nameCus, setNameCus] = useState("");
  const [idWareHouse, setIdWareHouse] = useState("");
  const [selectOption, setSelectOption] = useState([]);
  const [qtyProduct, setQtyProduct] = useState("");
  const [selectProduct, setSelectProduct] = useState("");

  const [allWareHouse, setAllWareHouse] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [allOption, setAllOption] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreateOrderDirect = async (
    phone,
    nameCus,
    idWareHouse,
    idProduct,
    selectOption,
    qty
  ) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-order-direct/`, {
        phonenumber: phone,
        fullname: nameCus,
        warehouse_id: idWareHouse,
        product: [
          {
            product_id: idProduct,
            optionvalue: [selectOption],
            amount: qty,
          },
        ],
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Tạo Đơn Thành Công");
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

  const callAllProduct = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-all-product?brand_id=&category_id=`
      )
      .then((res) => {
        setAllProduct(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let productOption = allProduct?.map((item, index) => {
    return { label: item.name, value: item.id };
  });
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
    callAllWareHouse();
    callAllProduct();
    callAllOption(selectProduct, selectOption);
  }, [selectOption, selectProduct]);

  const handleProduct = (e) => {
    setSelectProduct(e.value);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Tạo Đơn</i>
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
          <div className="form-title">Tạo Đơn Hàng</div>
          <div className="form-input">
            <form>
              <label>Tên Khách Hàng</label>
              <Input
                type="text"
                placeholder="Tên Khách Hàng"
                onChange={(e) => setNameCus(e.target.value)}
              />
              <label>Số Điện Thoại</label>
              <Input
                type="number"
                placeholder="Số Điện Thoại"
                onChange={(e) => setPhoneCus(e.target.value)}
              ></Input>

              <label>Chọn Kho</label>
              <select onChange={(e) => setIdWareHouse(e.target.value)}>
                <option>Chọn Kho</option>
                {allWareHouse?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <label>Chọn Sản Phẩm</label>
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

              <label>Số Lượng</label>
              <Input
                type="number"
                onChange={(e) => setQtyProduct(e.target.value)}
              ></Input>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>

          <Button
            onClick={() =>
              handleCreateOrderDirect(
                phoneCus,
                nameCus,
                idWareHouse,
                selectProduct,
                selectOption,
                qtyProduct
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

export default AddOrder;
