import React, { useEffect, useState } from "react";
import axios from "axios";

const Employee = () => {
  const [allStaff, setAllStaff] = useState([]);

  const callAllStaff = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-staff/`)
      .then((res) => {
        setAllStaff(res.data.staff);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllStaff();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Nhân Viên</h2>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Email</td>
                    <td>Tên</td>
                    <td>Phân Quyền</td>
                  </tr>
                </thead>
                <thead>
                  {allStaff?.map((item, index) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.fullname}</td>
                      <td>{item.role_id}</td>
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

export default Employee;
