import React, { useState } from "react";
import Menu from "../../assets/img/menu.svg";

const PlayerButton = ({ sethammenu }) => {
  const [isactive, setisactive] = useState(false);
  return (
    <>
      <div
        onClick={() => sethammenu((prev) => !prev)}
        className="media-icon audio-player-icon-open"
        onMouseEnter={() => setisactive(true)}
        onMouseLeave={() => setisactive(false)}
      >
        {/* <span> */}
        <img
          src={Menu}
          alt="hamburger menu"
          style={{ height: "25px", width: "25px" }}
        />
        {/* </span> */}
      </div>
      <div className={isactive ? "onmouse-menu-open" : "onmouse-menu-close"}>
        MENU
      </div>
    </>
  );
};

export default PlayerButton;
