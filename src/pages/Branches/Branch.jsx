import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AddBranch from "./AddBranch/AddBranch";
import DeleteBranch from "./DeleteBranch/DeleteBranch";
import UpdateBranch from "./UpdateBranch/UpdateBranch";

const Branch = () => {
  const [allBranch, setAllBranch] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };
  const callAllBranch = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-warehouse/`)
      .then((res) => {
        setAllBranch(res.data.Warehouse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllBranch();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Chi Nhánh</h2>
        <AddBranch parentCallback={callbackFunction}></AddBranch>
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
                  {allBranch
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>
                          <div className="card__body__features">
                            <span className="card__body__features__edit">
                              {/* <i className="bx bxs-edit"></i> */}
                              <UpdateBranch
                                idBranch={item.id}
                                nameBranch={item.name}
                                addressBranch={item.address}
                                parentCallback={callbackFunction}
                              ></UpdateBranch>
                            </span>
                            <span className="card__body__features__delete">
                              <DeleteBranch
                                idBranch={item.id}
                                parentCallback={callbackFunction}
                              ></DeleteBranch>
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

export default Branch;
