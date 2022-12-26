import React, { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [allCustomer, setAllCustomer] = useState([]);

  const callAllCustomer = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-user`)
      .then((res) => {
        setAllCustomer(res.data.customer);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllCustomer();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Khách Hàng</h2>
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
                    <td>Tên</td>
                    <td>SĐT</td>
                    <td>Ngày Sinh</td>
                    <td>Địa Chỉ</td>
                  </tr>
                </thead>
                <thead>
                  {allCustomer
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.fullname}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.birthday.slice(0, 10)}</td>
                        <td>{item.address}</td>
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

export default Customers;
