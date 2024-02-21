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
// <div>
//   {type.map((field, index) => (
//     <div key={index} className={css.inputBoxContainer}>
//       <select>
//         <option selected>Төрөл</option>
//         <option value={selectedOption}>Тавьсан</option>
//         <option value={selectedOption}>Шилжүүлсэн</option>
//         <option value={selectedOption}>Хураасан</option>
//         <option value={selectedOption}>Номер сольсон</option>
//         <option value={selectedOption}>Нэр сольсон</option>
//       </select>
//       <div className={css.inputBox}>
//         <label>Хүний нэр:</label>
//         <MyInput
//           type="text"
//           name="name"
//           defaultValue={field.name}
//           onChange={(e) => handleInput("input", index, e)}
//         />
//       </div>
//       <div className={css.inputBox}>
//         <label>Тайлбар:</label>
//         <MyInput
//           type="text"
//           name="description"
//           defaultValue={field.description}
//           onChange={(e) => handleInput("input", index, e)}
//         />
//       </div>
//       <div className={css.inputBox}>
//         <label>Он сар өдөр:</label>
//         <MyInput
//           type="date"
//           name="date"
//           defaultValue={field.date}
//           onChange={(e) => handleInput("input", index, e)}
//         />
//       </div>
//     </div>
//   ))}

//   <button type="button" onClick={addType}>
//     Төрөл нэмэх
//   </button>
// </div>;
