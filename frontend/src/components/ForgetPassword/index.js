import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import css from "./style.module.css";

const ForgetPassword = ({ token }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:4000/send-code", { email });
      navigate(`/ResetPasswordForm/${token}/verify`);
    } catch (error) {
      console.error("Error sending code:", error);
    } finally {
      setLoading(false);
    }
    console.log(email);
  };

  return (
    <section className={css.loginSection}>
      <div className={css.formBox}>
        <div className={css.formValue}>
          <form className="form" onSubmit={handleSubmit}>
            <h2>
              <strong>Нууц үг мартсан</strong>
            </h2>

            <br />
            <div className={css.inputBox}>
              <input
                type="text"
                className="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>
                <p>Мэйл хаяг</p>
              </label>
            </div>

            <div className={css.buttonContainer}>
              <button className={css.button} type="submit" disabled={loading}>
                <p>{loading ? "Sending..." : "код илгээх"}</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
