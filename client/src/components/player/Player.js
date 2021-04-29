/* eslint-disable */
import React, { useEffect } from "react";
import Marquee from "react-double-marquee";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Player = ({
  //new menu
  sethammenu,
  /////// info of audio
  voicenoteFile,
  audioTitle,
  cityName,
  countryName,
  utc,
  ///////open menu for importing
  audioimportOpenHandler,
  ////////open rules modal
  // openrulez,
  setopenrulez,
  /////////change Song controls
  isplayerHnadler,
  /////////menu Songs
  menuOpen,
  setmenuOpen,
}) => {
  // handler for new tracks
  useEffect(() => {
    if (voicenoteFile == null) return;
    sethammenu(false);
    setmenuOpen(true);
  }, [voicenoteFile]);

  // handlers for opening menus
  useEffect(() => {
    if (menuOpen) {
      audioimportOpenHandler(false);
      setopenrulez(false);
    }
  }, [menuOpen]);

  return (
    <>
      <div className={menuOpen ? "audio-player-open" : "audio-player-close"}>
        <div>
          <div
            style={{
              display: "flex",

              padding: "5px 5px",
            }}
          >
            <div className="audio-player-top">
              <div className="marquee-audio-title">
                <Marquee direction="left" delay={3000} scrollWhen="overflow">
                  {audioTitle} <em>{utc}</em>
                </Marquee>
              </div>

              <div className="audio-subtitle">
                {cityName}, {countryName}
              </div>
            </div>
          </div>
          <AudioPlayer
            style={{ borderRadius: "20px", width: "290px" }}
            autoPlay
            src={voicenoteFile}
            showSkipControls={true}
            showJumpControls={false}
            hasDefaultKeyBindings={true}
            onClickPrevious={() => isplayerHnadler("<-")}
            onClickNext={() => isplayerHnadler("->")}
          />
        </div>
      </div>
    </>
  );
};

export default Player;
