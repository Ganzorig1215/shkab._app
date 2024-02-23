import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import DashBoard from "../DashBoard";
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import { useNavigate } from "react-router-dom";
import { Notification, notification } from "antd";

const HomePage = () => {
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token1 = localStorage.getItem("token");
    setToken(token1);
    if (!token1) {
      notification.error({ message: "Нэвтэрч орно уу" });
      navigate("/login");
    }
  });
  return (
    <div className={css.main}>
      <div className={css.SideBar}>
        <SideBar />
      </div>

      <div className={css.container}>
        <header>
          <Navbar />
        </header>
        <section>
          <DashBoard />
        </section>
        <footer></footer>
      </div>
    </div>
  );
};

export default HomePage;
