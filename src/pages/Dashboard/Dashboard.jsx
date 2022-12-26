import React from "react";

import { Link } from "react-router-dom";

// import Chart from "react-apexcharts";

import { useSelector } from "react-redux";
import { Line } from "@ant-design/charts";

import StatusCard from "../../components/statuscard/StatusCard";

import Table from "../../components/table/Table";

import Badge from "../../components/badge/Badge";

import statusCards from "../../assets/JsonData/status-card-data.json";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const data = [
  { month: "Th1", value: 3 },
  { month: "Th2", value: 4 },
  { month: "Th3", value: 3.5 },
  { month: "Th4", value: 5 },
  { month: "Th5", value: 4.9 },
  { month: "Th6", value: 6 },
  { month: "Th7", value: 7 },
  { month: "Th8", value: 9 },
  { month: "Th9", value: 13 },
];

const config = {
  data,
  width: 500,
  height: 400,
  autoFit: false,
  xField: "month",
  yField: "value",
  point: {
    size: 5,
    shape: "diamond",
  },
  label: {
    style: {
      fill: "#aaa",
    },
  },
};

let chart;

// Export Image
const downloadImage = () => {
  chart?.downloadImage();
};

// Get chart base64 string
const toDataURL = () => {
  console.log(chart?.toDataURL());
};

// const topCustomers = {
//   head: ["user", "total orders", "total spending"],
//   body: [
//     {
//       username: "john doe",
//       order: "490",
//       price: "$15,870",
//     },
//     {
//       username: "frank iva",
//       order: "250",
//       price: "$12,251",
//     },
//     {
//       username: "anthony baker",
//       order: "120",
//       price: "$10,840",
//     },
//     {
//       username: "frank iva",
//       order: "110",
//       price: "$9,251",
//     },
//     {
//       username: "anthony baker",
//       order: "80",
//       price: "$8,840",
//     },
//   ],
// };

// const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

// const renderCusomerBody = (item, index) => (
//   <tr key={index}>
//     <td>{item.username}</td>
//     <td>{item.order}</td>
//     <td>{item.price}</td>
//   </tr>
// );

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const Dashboard = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [countOrder, setCountOrder] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalProduct, setTotalProduct] = useState();
  const [totalOrder, setTotalOrder] = useState();

  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const statusOrder = [
    {
      id: 1,
      name: "Chờ Xác Nhận",
    },
    {
      id: 2,
      name: "Đang Chuẩn Bị",
    },
    {
      id: 3,
      name: "Đang giao",
    },
    {
      id: 4,
      name: " Giao Thành Công",
    },
    {
      id: 5,
      name: "Đã Hủy",
    },
  ];

  const callAllOrderCount = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/Count-Order-chart/`)
      .then((res) => {
        setCountOrder(res.data.order);
        setTotalPrice(res.data.price);
        setTotalProduct(res.data.product);
        setTotalOrder(res.data.ordersta4);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callAllOrder = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-order/`)
      .then((res) => {
        console.log(res.data.order);
        setAllOrder(res.data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllOrder();
    callAllOrderCount();
  }, []);

  const dateOrder = allOrder?.map((item, index) => item.createdAt);
  console.log("object", dateOrder);

  const chartOrder = [
    {
      icon: "bx bx-shopping-bag",
      count: totalProduct,
      title: "Sản Phẩm Đã Bán",
    },
    {
      icon: "bx bx-receipt",
      count: countOrder,
      title: "Tổng Đơn Hàng",
    },
    {
      icon: "bx bx-dollar-circle",
      count: `${totalPrice}Đ`,
      title: "Tổng Thu Nhập",
    },
    {
      icon: "bx bx-cart",
      count: totalOrder,
      title: "Đơn Đã Đặt",
    },
  ];

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {chartOrder.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <div>
              {/* <button
                type="button"
                onClick={downloadImage}
                style={{ marginRight: 24 }}
              >
                Export Image
              </button> */}
              {/* <button type="button" onClick={toDataURL}>
                Get base64
              </button> */}
              <Line
                {...config}
                onReady={(chartInstance) => (chart = chartInstance)}
              />
            </div>
          </div>
        </div>
        {/* <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>Khách Hàng</h3>
            </div>
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>Khách Hàng</td>
                    <td>Tổng Đơn Đặt</td>
                    <td>Tổng Chi Tiêu </td>
                  </tr>
                </thead>
                <thead>
                  {allCustomer?.map((item, index) => (
                    <>
                      <tr>
                        <td>{item.code}</td>
                        <td>{item.fullname}</td>
                      </tr>
                    </>
                  ))}
                </thead>
              </table>
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div> */}
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>Danh Sách Đơn Hàng</h3>
            </div>
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>Mã Đơn Hàng</td>
                    <td>Khách Hàng</td>
                    <td>Ngày Đặt</td>
                    <td>Tình Trạng</td>
                  </tr>
                </thead>
                <thead>
                  {allOrder?.map((item, index) => (
                    <>
                      <tr>
                        <td>{item.code}</td>
                        <td>{item.fullname}</td>
                        <td>{item.createdAt.slice(0, 10)}</td>
                        <td>
                          {item.status === 1
                            ? "Chờ Xác Nhận"
                            : item.status === 2
                            ? "Đang Chuẩn bị"
                            : item.status === 3
                            ? "Đang Giao"
                            : item.status
                            ? "Giao Thành Công"
                            : item.status === 5
                            ? "Đã Hủy"
                            : null}
                        </td>
                      </tr>
                    </>
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

export default Dashboard;
