/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteBlog from "./DeleteBlog/DeleteBlog";
import AddBlog from "./AddBlog/AddBlog";
import UpdateBlog from "./UpdateBlog/UpdateBlog";
import "./style.scss";

const Blog = () => {
  const [allBlog, setAllBlog] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };
  const callAllBlog = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-blog/`)
      .then((res) => {
        setAllBlog(res.data.blog);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllBlog();
  }, [reloadPage]);

  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Bài Viết</h2>
        <AddBlog parentCallback={callbackFunction}></AddBlog>
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
                    <td>Hình Ảnh</td>

                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead>
                  {allBlog?.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.id}</td>
                      <td>{item?.name}</td>
                      <td>
                        <div className="word-wrap">{item?.Description}</div>
                      </td>
                      <td>
                        <img
                          className="blog-img"
                          src={item.img ? item.img : item.name}
                        />
                      </td>

                      <td>
                        <div className="card__body__features">
                          <span className="card__body__edit">
                            <UpdateBlog
                              id={item?.id}
                              descBlog={item?.Description}
                              statusBlog={item?.sta_id}
                              nameBlog={item?.name}
                              imgBlog={item?.img}
                              parentCallback={callbackFunction}
                            ></UpdateBlog>
                          </span>
                          <span className="card__body__delete">
                            <DeleteBlog
                              item={item?.id}
                              img={item?.img}
                              parentCallback={callbackFunction}
                            ></DeleteBlog>
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

export default Blog;
