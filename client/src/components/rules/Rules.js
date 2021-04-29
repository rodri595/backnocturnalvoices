import React from "react";

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
                fontSize: "23px",
                fontWeight: "bolder",
                color: "white",
              }}
            >
              {page === "archive"
                ? "THE ARCHIVE MAP OF NOCTURNAL VOICES"
                : "WELCOME TO THE NOCTURNAL VOICES"}
            </div>
            {page === "archive" ? (
              <>
                <div
                  className="rule-questions text-white"
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="rule-questions text-white">
                  Explore, click and listen to previous submissions from around
                  the world.
                </div>
              </>
            ) : (
              <>
                <div
                  className="rule-questions text-white"
                  style={{ marginTop: "20px" }}
                >
                  What do you love about the night? OR what do you miss about
                  the day?
                </div>
                <div className="rule-questions text-white">
                  You see a world that other people have not seen before, what
                  is something that you want people to know about working night
                  shifts?
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
