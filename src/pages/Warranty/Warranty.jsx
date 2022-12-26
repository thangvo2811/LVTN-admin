import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Warranty = () => {
  const [allWarranty, setAllWarranty] = useState([]);
  const callAllWarranty = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-warranty/`)
      .then((res) => {
        setAllWarranty(res.data.Warranty);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllWarranty();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Bảo Hành</h2>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Tên</td>
                    <td>Thông Tin</td>
                    <td>Mô Tả</td>
                    <td>Mã Đơn</td>
                  </tr>
                </thead>
                <thead>
                  {allWarranty?.map((item, index) => (
                    <tr>
                      <td>{item?.id}</td>
                      <td>{item?.infor}</td>
                      <td>{item?.description}</td>
                      <td>{item?.expire}</td>
                      <td>{item?.code}</td>
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

export default Warranty;
