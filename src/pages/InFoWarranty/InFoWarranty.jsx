import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import AddWarrantyOne from "./AddWarrantyOne/AddWarrantyOne";
import UpdateWarrantyOne from "./UpdateWarrantyOne/UpdateWarrantyOne";

const InFoWarranty = (props) => {
  const [infoWarranty, setInfoWarranty] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callInfoWarranty = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-warranty-info/${1}/`)
      .then((res) => {
        setInfoWarranty(res.data.warranty);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    callInfoWarranty();
  }, [callInfoWarranty, reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Thông Tin Bảo Hành</h2>
        <AddWarrantyOne parentCallback={callbackFunction}></AddWarrantyOne>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Tên Sản Phẩm</td>
                    <td>Thông Tin</td>
                    <td>Mô Tả</td>
                    <td>Số Máy</td>
                  </tr>
                </thead>
                <thead>
                  {infoWarranty
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr>
                        <td>{item?.id}</td>
                        <td>{item?.name}</td>
                        <td>{item?.infor}</td>
                        <td>{item?.description}</td>
                        <td>{item?.serinumber}</td>
                        <td>
                          <div className="card__body__features">
                            <span className="card__body__features__edit">
                              <UpdateWarrantyOne
                                item={item}
                                parentCallback={callbackFunction}
                              ></UpdateWarrantyOne>
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

export default InFoWarranty;
