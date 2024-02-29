import React, { useState } from "react";
import css from "./style.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { notification } from "antd";

const Register = () => {
  const defaultPort = 4000;
  const Navigate = useNavigate();
  const [passwordVisibility1, setPasswordVisibility1] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleInputChange = (e) => {
    e.persist();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      notification.error({ message: "Бүх талбарыг бөглөнө үү." });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      notification.error({ message: "Нууц үг адил биш байна." });
      return;
    }
    const data = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    };
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/register`;
    try {
      const response = axios.post(apiUrl, data);
      notification.success({ message: "Амжилттай бүртгэлээ" });
      Navigate("/Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={css.loginSection}>
      <div className={css.formBox}>
        <div className={css.formValue}>
          <form className="form" onSubmit={handleSubmit}>
            <h2>
              <strong>Бүртгүүлэх</strong>
            </h2>
            <div className={css.inputBox}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <label>Овог нэр:</label>
            </div>
            <div className={css.inputBox}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label>Мэйл хаяг:</label>
            </div>
            <div className={css.inputBox}>
              <input
                type={passwordVisibility1 ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <label>Нууц үг:</label>
              <BiSolidShow
                type="button"
                onClick={() => setPasswordVisibility1(!passwordVisibility1)}
              />
              {passwordVisibility1 ? "Hide" : "Show"}
            </div>
            <div className={css.inputBox}>
              <input
                type={passwordVisibility2 ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <label>Нууц үг давтах:</label>
              <BiSolidShow
                type="button"
                onClick={() => setPasswordVisibility2(!passwordVisibility2)}
              />
              {passwordVisibility2 ? "Hide" : "Show"}
            </div>
            <div>
              <button className={css.button} type="submit">
                Бүртгүүлэх
              </button>
            </div>
          </form>
          <p className={css.backLink}>
            Нэвтрэх хуудас руу <Link to="/Login">энд дарж</Link> шилжнэ үү.
          </p>
          {/* <p>
            Нэвтрэх хуудас руу <a href="">энд дарж</a> шилжнэ үү.
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default Register;
