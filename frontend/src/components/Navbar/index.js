import React from "react";
import css from "./style.module.css";
import { Button, Flex } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const Navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    Navigate("/login");
  };
  return (
    <header className={css.header}>
      <Button className={css.test} onClick={logout}>
        <AiOutlinePoweroff />
      </Button>
    </header>
  );
};

export default Navbar;
