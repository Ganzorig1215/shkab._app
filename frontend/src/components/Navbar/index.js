import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import { Button } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

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
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    Navigate("/login");
  };

  return (
    <header className={css.header}>
      <div className={css.logoutContainer}>
        <Button className={css.test} onClick={handleLogout}>
          {/* {user && user.name} */} <AiOutlinePoweroff />
        </Button>

        {/* {showLogoutConfirmation && (
          <Button className={css.test1} onClick={handleLogout}>

          </Button>
        )} */}
      </div>
    </header>
  );
};

export default Navbar;
