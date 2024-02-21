import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { Radio } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const SideBar = ({ userRole }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState();
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (key) => {
    if (key === "1") {
      navigate("/");
    } else if (key === "2") {
      navigate("/AddAdmin");
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);
  const items = [
    getItem("Нүүр хуудас", "1", <HomeOutlined />),
    role && role === "admin" && getItem("Админ нэмэх", "2", <UserOutlined />),

    getItem("Тохиргоо", "sub1", <SettingOutlined />, [
      getItem(
        <Radio.Group name="radiogroup" defaultValue={1}>
          <Radio value={1}> 🔆</Radio>
          <Radio value={2}>🌙</Radio>
        </Radio.Group>,
        "5"
      ),
    ]),
  ];

  return (
    <div
      style={{
        hover: { width: 200 },
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginTop: 15,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={({ key }) => handleMenuClick(key)}
      />
    </div>
  );
};

export default SideBar;
