import React from "react";
import css from "./style.module.css";

const MyButton = ({ onClick, label }) => {
  const buttonType = submit ? "submit" : "button";
  return (
    <div>
      <button onClick={onClick} className={css.button}>
        {label}
      </button>
    </div>
  );
};
export default MyButton;
