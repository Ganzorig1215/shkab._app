import React from "react";
import css from "./deleteModal.module.css";
import MyButton from "../myButton";
import { Button } from "antd";
const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <p>Та энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу ?</p>
        <div className={css.buttonContainer}>
          {/* <MyButton onClick={onCancel} label="Үгүй" />
          <MyButton onClick={onConfirm} label="Тийм" /> */}
          <Button type="primary" onClick={onCancel}>
            Үгүй
          </Button>
          <Button type="primary" onClick={onConfirm}>
            Тийм
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
