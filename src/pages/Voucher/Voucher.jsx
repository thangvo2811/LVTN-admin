import axios from "axios";
import React, { useEffect, useState } from "react";
import AddVoucher from "./AddVoucher/AddVoucher";
import DeleteVoucher from "./DeleteVoucher/DeleteVoucher";
import UpdateVoucher from "./UpdateVoucher/UpdateVoucher";

const Voucher = () => {
  const [allVoucher, setAllVoucher] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllVoucher = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-event/`)
      .then((res) => {
        setAllVoucher(res.data.event);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllVoucher();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Voucher</h2>
        <AddVoucher parentCallback={callbackFunction}></AddVoucher>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Tên Voucher</td>
                    <td>Ngày Bắt Đầu</td>
                    <td>Ngày Kết Thúc</td>
                  </tr>
                </thead>
                <thead>
                  {allVoucher?.map((item, index) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.datestart.slice(0, 10)}</td>
                      <td>{item.dateend.slice(0, 10)}</td>
                      <div className="card__body__features">
                        <span className="card__body__features__edit">
                          {/* <i className="bx bxs-edit"></i> */}
                          <UpdateVoucher
                            idVoucher={item.id}
                            nameVoucher={item.name}
                            dateStart={item.datestart}
                            dateEnd={item.dateend}
                            parentCallback={callbackFunction}
                          ></UpdateVoucher>
                        </span>
                        <span className="card__body__features__delete">
                          <DeleteVoucher
                            idVoucher={item.id}
                            parentCallback={callbackFunction}
                          ></DeleteVoucher>
                        </span>
                      </div>
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

export default Voucher;
