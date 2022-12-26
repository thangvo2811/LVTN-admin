import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteComment from "./DeleteComment/DeleteComment";

const Comments = () => {
  const [allComment, setAllComment] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllComment = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-comment/`)
      .then((res) => {
        setAllComment(res.data.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllComment();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Đánh Giá</h2>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Mã Khách Hàng</td>
                    <td>Mã Sản Phẩm</td>
                    <td>Nội Dung</td>
                    <td>Đánh Giá</td>
                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead>
                  {allComment?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.cus_id}</td>
                      <td>{item.product_id}</td>

                      <td>{item.description}</td>

                      <td>{item.rate}</td>
                      <td>
                        <div className="card__body__features">
                          <span className="card__body__features__delete">
                            <DeleteComment
                              item={item.id}
                              parentCallback={callbackFunction}
                            ></DeleteComment>
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

export default Comments;
