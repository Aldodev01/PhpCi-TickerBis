import { Breadcrumb } from "antd";
import React from "react";

const HistoryLink = ({ data, menu, icon, id }) => {
  return (
    <Breadcrumb separator="/">
      {/* <Breadcrumb.Item key={id} href={item.link} overlay={menu && menu}>
        {icon}
      </Breadcrumb.Item> */}
    </Breadcrumb>
  );
};

export default HistoryLink;
