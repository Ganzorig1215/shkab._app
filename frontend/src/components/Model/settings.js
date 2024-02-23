import React, { useState, useEffect } from "react";
import css from "./settings.module.css";
import DarkMode from "../DarkMode";

const Settings = () => {
  return (
    <div className={css.container}>
      <DarkMode />
    </div>
  );
};
export default Settings;
