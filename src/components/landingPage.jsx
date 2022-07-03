import React from "react";
import { NavLink } from "react-router-dom";
import s from "../components/styles/land.module.css";

export default function LandingPage() {
  return (
    <React.Fragment>
      <div className={s.container}>
        <div>
          <div>
            <h3 className={s.text}>
              <br /> VIDEOGAMES
              <br />
              <br /> Click the button below to explore!
            </h3>
          </div>
          <NavLink to={"/home"}>
            <button className={s.button} src="/home">
              HOME
            </button>
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
}
