import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "antd";
import axios from "axios";
import { message } from "antd";
import { useEffect } from "react";

const AddWarrantyTwo = (props) => {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = useState("");
  const [desc, setDesc] = useState("");
  const [selectOrderCode, setSelectOrderCode] = useState("");
  const [seriNumber, setSeriNumber] = useState("");

  const [allOrder, setAllOrder] = useState([]);
  const [allSeriNumber, setAllSeriNumber] = useState([]);

  const idStaff = localStorage.getItem("admin");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callCreateWarrantyInfo = async (info, desc, staId, order, seri) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-warranty/`, {
        infor: info,
        description: desc,
        sta_id: staId,
        order_id: order,
        serinumber: seri,
      })
      .then((res) => {
        if (res.data.errCode === 1) {
          message.error("Không Tìm Thấy Đơn Bảo Hành");
          return;
        }
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Tạo Đơn Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };

  const callAllOrder = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-order/`)
      .then((res) => {
        setAllOrder(res.data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callAllSeriNumber = async (orderId) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-order-detail/${orderId}/`)
      .then((res) => {
        setAllSeriNumber(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllOrder();
    callAllSeriNumber(selectOrderCode);
  }, [selectOrderCode]);

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
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div className="form-title">Đơn Bảo Hành</div>
          <div className="form-input">
            <form>
              <label>Mã Đơn Hàng</label>
              <select onChange={(e) => setSelectOrderCode(e.target.value)}>
                <option>Mã Đơn Hàng</option>
                {allOrder?.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item?.code}
                  </option>
                ))}
              </select>

              <label>Thông Số Máy</label>
              <select onChange={(e) => setSeriNumber(e.target.value)}>
                <option>Thông Số Máy</option>
                {allSeriNumber?.listOrder?.map((item, index) => {
                  return (
                    <>
                      <option
                        key={allSeriNumber.id}
                        value={item.Orderitem.serinumber}
                      >
                        {item?.Orderitem?.serinumber}
                      </option>
                    </>
                  );
                })}
              </select>

              {/* <label>Mã Nhân Viên</label> */}
              <Input type="hidden" placeholder="Mã Nhân Viên" value={idStaff} />

              <label>Thông Tin Đơn</label>
              <Input
                type="text"
                placeholder="Thông Tin Đơn"
                onChange={(e) => setInfo(e.target.value)}
              />
              <label>Nội Dung Bảo Hành</label>
              <Input
                type="text"
                placeholder="Nội Dung Bảo Hành"
                onChange={(e) => setDesc(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              callCreateWarrantyInfo(
                info,
                desc,
                idStaff,
                selectOrderCode,
                seriNumber
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

export default AddWarrantyTwo;
