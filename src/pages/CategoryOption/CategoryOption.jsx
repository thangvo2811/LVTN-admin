import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AddCategoryOption from "./AddCategoryOption/AddCategoryOption";

const CategoryOption = () => {
  const [allOption, setAllOption] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };
  const callAllOption = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-option/`)
      .then((res) => {
        setAllOption(res.data.option);
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
        <h2 className="page-header__title">Danh Mục Thuộc Tính</h2>
        <AddCategoryOption
          parentCallback={callbackFunction}
        ></AddCategoryOption>
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
                  </tr>
                </thead>
                <thead>
                  {allOption
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        {/* <td>
                          <div className="card__body__features">
                            <span className="card__body__features__edit">

                            </span>
                            <span className="card__body__features__delete"></span>
                          </div>
                        </td> */}
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

export default CategoryOption;
