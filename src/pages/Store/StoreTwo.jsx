import React from "react";
import { useCallback } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AddStore from "./AddStoreTwo/AddStore";

const StoreTwo = () => {
  const [allStore, setAllStore] = useState([]);
  const [reloadPage, setReloadPage] = useState("");

  const idBranch = 2;
  console.log("ID KHO 1", idBranch);

  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllStore = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/Get-all-warehouse/?id=${idBranch}`
      )
      .then((res) => {
        setAllStore(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idBranch]);
  useEffect(() => {
    callAllStore();
  }, [callAllStore, reloadPage]);
  return (
    <div>
      <div className="page-header">
        <AddStore parentCallback={callbackFunction}></AddStore>
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
                    <td>Mã Sản Phẩm</td>
                    <td>Tên Kho</td>
                    <td>Số Lượng</td>
                    <td>Thuộc Tính</td>
                  </tr>
                </thead>
                <thead>
                  {allStore
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.product_id}</td>
                        <td>{item.UserwarehouseProduct.name}</td>
                        <td>{item.quantity}</td>
                        <td className="option-value">
                          {item.optionvalue.map((data, i) => (
                            <td className="option-name">{data}</td>
                          ))}
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

export default StoreTwo;
