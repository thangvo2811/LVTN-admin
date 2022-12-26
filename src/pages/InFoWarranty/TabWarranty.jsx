import { Tabs } from "antd";
import React from "react";
import InFoWarranty from "./InFoWarranty";
import InfoWarrantyTwo from "./InfoWarrantyTwo";

const TabWarranty = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const tabContent = [
    {
      label: `CHI NHÁNH HỒ CHÍ MINH`,
      key: 1,
      children: <InFoWarranty />,
    },
    {
      label: `CHI NHÁNH HÀ HỘI`,
      key: 2,
      children: <InfoWarrantyTwo />,
    },
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={tabContent.map((tab) => {
          return tab;
        })}
      />
    </div>
  );
};

export default TabWarranty;
