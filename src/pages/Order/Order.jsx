import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import UpadateOrder from "./UpdateOrder/UpadateOrder";
import DeleteOrder from "./DeleteOrder/DeleteOrder";
import AddOrder from "./AddOrder/AddOrder";

const Order = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
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
  useEffect(() => {
    callAllOrder();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Đơn Hàng</h2>
        <AddOrder parentCallback={callbackFunction}></AddOrder>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Email</td>
                    <td>Tên Khách Hàng</td>
                    <td>SĐT</td>
                    <td>Địa Chỉ</td>
                    <td>Tình Trạng</td>
                  </tr>
                </thead>
                <thead>
                  {allOrder
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.fullname}</td>
                        <td>(+84) {item.phonenumber}</td>
                        <td>{item.Address}</td>
                        <td>{item.status}</td>
                        <td>
                          <div className="card__body__features">
                            <span className="card__body__features__edit">
                              <UpadateOrder
                                idOrder={item.id}
                                statusOrder={item.status}
                                parentCallback={callbackFunction}
                              ></UpadateOrder>
                            </span>
                            <span className="card__body__features__delete">
                              <DeleteOrder
                                idOrder={item.id}
                                parentCallback={callbackFunction}
                              ></DeleteOrder>
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
