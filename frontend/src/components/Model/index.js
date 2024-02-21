import React from "react";
import css from "./deleteModal.module.css";
import MyButton from "../myButton";
import { Button } from "antd";
const innerModal = ({ onCancel, onConfirm }) => {
  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <div className={css.buttonContainer}></div>
      </div>
    </div>
  );
};

export default innerModal;
