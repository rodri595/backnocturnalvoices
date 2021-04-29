/* eslint-disable */

import React, { useEffect } from "react";

const PlayerMenu = ({
  hammenu,
  sethammenu,
  setmenuOpen,
  audioimportOpenHandler,
  setopenrulez,
  setopenabout,
}) => {
  useEffect(() => {
    if (hammenu) {
      setmenuOpen(false);
      audioimportOpenHandler(false);
      setopenrulez(false);
      setopenabout(false);
    }
  }, [hammenu]);

  const menu = () => {
    sethammenu(false);
    setmenuOpen(true);
  };
  const add = () => {
    sethammenu(false);
    audioimportOpenHandler(true);
  };
  const rules = () => {
    sethammenu(false);
    setopenrulez(true);
  };
  const about = () => {
    sethammenu(false);
    setopenabout(true);
  };

  return (
    <div className={hammenu ? "menu-ham-open" : "menu-ham-close"}>
      <div className="media-icon list-ham-menu">
        <a style={{ color: "white" }} href="/" rel="noreferrer">
          HOME
        </a>
      </div>
      <div className="media-icon list-ham-menu" onClick={() => menu()}>
        PLAYER
      </div>
      <div className="media-icon list-ham-menu" onClick={() => add()}>
        SUBMIT YOUR VOICE
      </div>
      <div className="media-icon list-ham-menu">
        <a style={{ color: "white" }} href="/archive" rel="noreferrer">
          ARCHIVE
        </a>
      </div>
      <div className="media-icon list-ham-menu" onClick={() => rules()}>
        RULES
      </div>
      <div className="media-icon list-ham-menu" onClick={() => about()}>
        ABOUT
      </div>
    </div>
  );
};

export default PlayerMenu;
