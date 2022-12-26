import React, { useEffect, useState } from "react";
import axios from "axios";

import DeleteOption from "./DeleteOption/DeleteOption";
import UpdateOption from "./UpdateOption/UpdateOption";
import AddOption from "./AddOption/AddOption";

const Option = () => {
  const [allOption, setAllOption] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };
  const callAllOption = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-option-product/`)
      .then((res) => {
        setAllOption(res.data.Option);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllOption();
  }, [reloadPage]);

  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Thuộc Tính</h2>
        <AddOption parentCallback={callbackFunction}></AddOption>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Tên Thuộc Tính</td>
                    <td>Giá</td>
                    <td>Tên Sản Phẩm</td>
                    <td>Mã Sản Phẩm</td>
                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead>
                  {allOption
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item?.id}</td>
                        <td>{item?.name}</td>
                        <td>{item?.price}</td>
                        <td>{item?.Product?.name}</td>
                        <td>{item?.product_id}</td>
                        <td>
                          <div className="card__body__features">
                            <span className="card__body__features__edit">
                              <UpdateOption
                                id={item?.id}
                                name={item?.name}
                                price={item?.price}
                                idProduct={item?.product_id}
                                idOption={item?.option_id}
                                parentCallback={callbackFunction}
                                nameProduct={item?.Product?.name}
                                nameOption={item?.Option?.name}
                              ></UpdateOption>
                            </span>
                            <span className="card__body__features__delete">
                              <DeleteOption
                                item={item?.id}
                                parentCallback={callbackFunction}
                              ></DeleteOption>
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

export default Option;
