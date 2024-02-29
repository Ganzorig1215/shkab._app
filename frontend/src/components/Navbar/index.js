import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import { Button, Radio } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DarkMode from "../DarkMode";

const Navbar = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // console.log(isDarkMode);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUser({ name: storedName });
    }
  }, []);

  const showLogoutConfirmationDiv = () => {
    setShowLogoutConfirmation(!showLogoutConfirmation);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("theme");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    Navigate("/login");
  };
  const toggleDarkMode = (value) => {
    setIsDarkMode(value === 2);
  };

  return (
    <header className={`${css.header} ${isDarkMode ? css.darkMode : ""}`}>
      <div className={css.radio}>
        {/* <Radio.Group
          name="radiogroup"
          defaultValue={1}
          onChange={(e) => toggleDarkMode(e.target.value)}
        >
          <Radio value={1}>Light 🔆</Radio>
          <Radio value={2}>Dark🌙</Radio>
        </Radio.Group> */}
        <DarkMode />
      </div>
      <div className={css.logoutContainer}>
        <Button className={css.logout} onClick={handleLogout}>
          {/* {user && user.name} */} <AiOutlinePoweroff />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
