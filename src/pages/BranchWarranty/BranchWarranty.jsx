import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const BranchWarranty = () => {
  const [allBranchWarranty, setAllBranchWarranty] = useState([]);

  const callAllBranchWarranty = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-store/`)
      .then((res) => {
        setAllBranchWarranty(res.data.store);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllBranchWarranty();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Chi Nhánh Bảo Hành</h2>
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
                    <td>Địa Chỉ</td>
                  </tr>
                </thead>
                <thead>
                  {allBranchWarranty?.map((item, index) => (
                    <tr>
                      <td>{item?.id}</td>
                      <td>{item?.name}</td>
                      <td>{item?.address}</td>
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

export default BranchWarranty;
