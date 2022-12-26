/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteProduct from "./DeleteProduct/DeleteProduct";
import AddProduct from "./AddProduct/AddProduct";
import "./style.scss";
import UploadProduct from "./UpdateProduct/UploadProduct";

const Products = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllProduct = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-all-product-admin/?brand_id=&category_id=`
      )
      .then((res) => {
        console.log(res.data);
        setAllProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllProduct();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Sản Phẩm</h2>
        <div>
          <AddProduct parentCallback={callbackFunction}></AddProduct>
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
                    <td>Tên Sản Phẩm</td>
                    <td>Hình Ảnh</td>
                    <td>Giá</td>
                    <td>Số Lượng Hiện Tại</td>
                    <td>Số Lượng Ban Đầu</td>
                    <td>Mô Tả</td>
                    <td>Tên Danh Mục</td>
                    <td>Tên Thương Hiệu</td>
                    <td>Tình Trạng</td>
                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead>
                  {allProduct
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item?.id}</td>
                        <td>
                          <div className="word-wrap">{item?.name}</div>
                        </td>
                        <td>
                          <img
                            className="product-img"
                            src={item?.img ? item?.img : item?.name}
                          />
                        </td>
                        <td>{item?.unitprice}</td>
                        <td>{item?.currentQuantity}</td>
                        <td>{item?.IntialQuantity}</td>
                        <td>
                          <div className="word-wrap">{item?.Description}</div>
                        </td>
                        <td>{item?.CategoryProduct.name}</td>
                        <td>{item?.ProductBrand.name}</td>
                        <td>{item?.status}</td>
                        <td>
                          <div className="card__body__features">
                            <span className="card__body__features__edit">
                              <UploadProduct
                                id={item?.id}
                                nameProduct={item?.name}
                                nameCate={item?.CategoryProduct.name}
                                nameBrand={item?.ProductBrand.name}
                                price={item?.unitprice}
                                imgProduct={item?.img}
                                descProduct={item?.Description}
                                parentCallback={callbackFunction}
                              ></UploadProduct>
                            </span>
                            <span className="card__body__features__delete">
                              <DeleteProduct
                                item={item?.id}
                                parentCallback={callbackFunction}
                              ></DeleteProduct>
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

export default Products;
