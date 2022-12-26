import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCommnet from "./AddComment/AddCommnet";
import DeleteComment from "./DeleteFeedBack/DeleteComment";
import UpdateComment from "./UpdateFeedBack/UpdateComment";

const FeedBack = () => {
  const [allComment, setAllComment] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllComment = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-comment-admin/`)
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
        <AddCommnet parentCallback={callbackFunction}></AddCommnet>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Mã Bình Luận</td>
                    <td>Nội Dung</td>
                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead>
                  {allComment?.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.id}</td>
                      <td>{item?.comment_id}</td>
                      <td>{item?.description}</td>
                      <td>
                        <div className="card__body__features">
                          <span className="card__body__features__edit">
                            <UpdateComment
                              id={item?.id}
                              idComment={item?.comment_id}
                              descComment={item?.description}
                              parentCallback={callbackFunction}
                            ></UpdateComment>
                          </span>
                          <span className="card__body__features__delete">
                            <DeleteComment
                              id={item?.id}
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

export default FeedBack;
