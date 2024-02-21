import React from "react";
import css from "./style.module.css";

const MyInput = ({ type, label, ...restProps }) => {
  return (
    <div className={css.inputContainer}>
      <label className={css.label}>{label}</label>
      <input type={type} className={css.input} {...restProps} />
    </div>
  );
};

export default MyInput;
