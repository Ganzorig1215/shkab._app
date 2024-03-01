import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import CreateUsersCard from "./components/CreateUsersCard";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import UpdateUser from "./components/Users/updateUsers";
import CreateEnjuryCard from "./components/CreateEnjuryCard";
import More from "./components/More";
import AddAdmin from "./components/AddAdmin";
import ForgetPassword from "./components/ForgetPassword";
import ResetPasswordForm from "./components/ResetPassword";
import { message, notification } from "antd";

function App() {
  const [theme, setTheme] = useState();
  useEffect(() => {
    const theme1 = localStorage.getItem("theme");
    setTheme(theme1);
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="ForgetPassword" element={<ForgetPassword />} />
          <Route path="ResetPasswordForm" element={<ResetPasswordForm />} />
          <Route path="/CreateUsersCard" element={<CreateUsersCard />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/AddAdmin" element={<AddAdmin />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="/More/:usernumber" element={<More />} />
          <Route
            path="/CreateEnjuryCard/:usernumber"
            element={<CreateEnjuryCard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
