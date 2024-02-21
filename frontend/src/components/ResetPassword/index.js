import React, { useState } from "react";
import css from "./style.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { notification } from "antd";

const ResetPasswordForm = () => {
  const [receivedCode, setReceivedCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordVisibility1, setPasswordVisibility1] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);
  const [formData, setFormData] = useState({
    receivedCode: "",
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
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/reset-password",
        {
          email,
        }
      );

      setMessage(response.data);
    } catch (error) {
      console.error("Error sending reset email:", error);
      setMessage("Error sending reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={css.loginSection}>
      <div className={css.formBox}>
        <div className={css.formValue}>
          <form className="form" onSubmit={handleSubmit}>
            <h2>
              <strong>Нууц үг сэргээх</strong>
            </h2>

            <br />
            <div className={css.inputBox}>
              <input
                type="text"
                className="number"
                name="number"
                value={formData.number}
                onChange={(e) => setReceivedCode(e.target.value)}
              />
              <label>
                <p>Илгээсэн кодыг оруулна уу:</p>
              </label>
            </div>
            <div className={css.inputBox}>
              <input
                type={passwordVisibility1 ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <label>Шинэ нууц үг:</label>
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

            <div className={css.buttonContainer}>
              <button className={css.button} type="submit" disabled={loading}>
                <p>{loading ? "Sending..." : "нууц  үг сэргээх"}</p>
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordForm;
