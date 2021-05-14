import React from "react";
import LightLogo from "../../assets/img/LightName.svg";

const Rules = ({ page, openrulez, setopenrulez }) => {
  return (
    <div className={openrulez ? "darulez-open " : " darulez-close"}>
      <div
        style={{
          padding: "20px",
        }}
      >
        <div className="container">
          <div
            onClick={() => setopenrulez(false)}
            className="media-icon"
            style={{
              position: "absolute",
              fontSize: "25px",
              fontWeight: "bolder",
              color: "#495fef",
              top: "10px",
              right: "20px",
              zIndex: "1000",
            }}
          >
            <span style={{ transform: "rotate(45deg)" }}>+</span>
          </div>
          <div className="text-center">
            <div
              style={{
                color: "white",
              }}
            >
              {page === "archive" ? (
                "THE ARCHIVE MAP OF NOCTURNAL VOICES"
              ) : (
                <img
                  src={LightLogo}
                  alt
                  draggable={false}
                  style={{ height: "150px" }}
                />
              )}
            </div>
            {page === "archive" ? (
              <>
                <div className="rule-questions text-white"></div>
                <div className="rule-questions text-white">
                  Explore, click and listen to previous submissions from around
                  the world.
                </div>
              </>
            ) : (
              <>
                <div className="rule-questions-home-top text-white">
                  “We have voices and opinions too, we just need a platform
                  where they can be heard.”
                </div>
                <div className="rule-questions-home-bottom text-white">
                  This is a collection of nocturnal voices. By recognising the
                  voices of night workers from around the world, we aim to help
                  alleviate a sense of loneliness and to spread awareness of the
                  hardships night workers experience.
                  <br />
                  <br />
                  Respond to the questions on the Rules page.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
