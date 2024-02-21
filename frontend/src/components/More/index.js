import React from "react";
import css from "./style.module.css";
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import MoreCard from "./more";

const More = (props) => {
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
          <MoreCard />
        </section>
        <footer></footer>
      </div>
    </div>
  );
};

export default More;
