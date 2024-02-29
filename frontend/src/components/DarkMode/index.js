import React, { useState, useEffect } from "react";
import { Radio } from "antd"; // Import Radio and Radio.Group from Ant Design
import css from "./style.module.css";

const DarkMode = () => {
  const [theme, setTheme] = useState("light");

  const setDarkMode = () => {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  };

  const setLightMode = () => {
    setTheme("light");
    localStorage.setItem("theme", "light");
  };

  const toggleTheme = (value) => {
    if (value === "light") {
      setLightMode();
    } else {
      setDarkMode();
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={css.theme}>
      <Radio.Group
        name="radiogroup"
        value={theme}
        onChange={(e) => toggleTheme(e.target.value)}
      >
        <Radio value="light">Light 🔆</Radio>
        <Radio value="dark">Dark🌙</Radio>
      </Radio.Group>
    </div>
  );
};

export default DarkMode;
