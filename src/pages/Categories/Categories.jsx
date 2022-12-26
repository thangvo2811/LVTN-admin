import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteCategory from "./DeleteCategory/DeleteCategory";
import UpdateCategory from "./UpdateCategory/UpdateCategory";
import AddCategory from "./AddCategory/AddCategory";

const Categories = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-category-parent/`)
      .then((res) => {
        setAllCategory(res.data.Category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllCategory();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Danh Mục</h2>
        <div>
          <AddCategory parentCallback={callbackFunction}></AddCategory>
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
                    <td>Mô Tả</td>
                    <td>Mã Danh Mục</td>
                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead>
                  {allCategory
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                          <div className="word-wrap"> {item.name}</div>
                        </td>
                        <td>
                          <div className="word-wrap">{item.description}</div>
                        </td>
                        <td>{item.parent_id}</td>
                        <td>
                          <div className="card__body__features">
                            <span className="card__body__features__edit">
                              <UpdateCategory
                                idcate={item.id}
                                nameCate={item.name}
                                parentIdCate={item.parent_id}
                                descCate={item.description}
                                parentCallback={callbackFunction}
                              ></UpdateCategory>
                            </span>
                            <span className="card__body__features__delete">
                              <DeleteCategory
                                item={item.id}
                                parentCallback={callbackFunction}
                              ></DeleteCategory>
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

export default Categories;
