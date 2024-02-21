import React, { useState, useEffect } from "react";
import css from "./style.module.css";

const DarkMode = () => {
  // const [theme, setTheme] = useLocalStorage("theme", "dark");

  // const switchTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  // };
  const [theme, setTheme] = useState("light");

  const setDarkMode = () => {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  };

  const setLightMode = () => {
    setTheme("light");
    localStorage.setItem("theme", "light");
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setDarkMode();
    } else {
      setLightMode();
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
      <div className={css.lightDark}>
        <input
          type="radio"
          id="light"
          name="fav_language"
          value="light"
          checked={theme === "light"}
          onChange={setLightMode}
        />
        <label htmlFor="light">Light🔆</label>
      </div>
      <div className={css.lightDark}>
        <input
          type="radio"
          id="dark"
          name="fav_language"
          value="dark"
          checked={theme === "dark"}
          onChange={setDarkMode}
        />
        <label htmlFor="dark">Dark🌙</label>
      </div>
    </div>
  );
};

export default DarkMode;
