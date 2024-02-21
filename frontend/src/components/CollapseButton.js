import React from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const CollapseButton = ({ collapsed, toggleCollapsed }) => {
  return (
    <Button
      type="primary"
      onClick={toggleCollapsed}
      style={{
        marginTop: 15,
        marginLeft: 120,
        position: "absolute",
        zIndex: 3,
      }}
    >
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </Button>
  );
};

export default CollapseButton;
