import React, { useEffect, useState } from "react";

import axios from "axios";
import AddBrand from "./AddBrand/AddBrand";

import "./style.scss";
import DeleteBrand from "./DeleteBrand/DeleteBrand";
import UpdateBrand from "./UpdateBrand/UpdateBrand";

const Brand = () => {
  const [allBrand, setAllBrand] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
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
    callAllBrand();
  }, [reloadPage]);

  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Thương Hiệu</h2>
        <div>
          <AddBrand parentCallback={callbackFunction}></AddBrand>
        </div>
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
                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead>
                  {allBrand
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                          <div className="card__body__features">
                            <span className="card__body__features__edit">
                              {/* <i className="bx bxs-edit"></i> */}
                              <UpdateBrand
                                name={item.name}
                                id={item.id}
                                parentCallback={callbackFunction}
                              ></UpdateBrand>
                            </span>
                            <span className="card__body__features__delete">
                              <DeleteBrand
                                item={item.id}
                                parentCallback={callbackFunction}
                              ></DeleteBrand>
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

export default Brand;
