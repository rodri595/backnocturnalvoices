import React from "react";

const About = ({ openabout, setopenabout }) => {
  return (
    <div className={openabout ? "open-menu-about" : "close-menu-about"}>
      <div className="abour-container">
        <div
          onClick={() => setopenabout(false)}
          className="media-icon"
          style={{
            position: "absolute",
            transform: "translateX(280px) rotate(45deg)",
            fontSize: "29px",
            color: "#495fef",
          }}
        >
          +
        </div>
        <br />
        <div>
          The night is a playground full of knowledge, emotions and experiences
          that some may never understand.
        </div>
        <br />
        <div>
          Londoners are more active between 6pm, and 6am more than anyone else
          in the UK. Two-thirds of Londoners regularly do everyday activities at
          night, and a staggering 1.6 million of them usually work at night -
          what are the stories behind these people?
        </div>
        <br />
        <div>
          Nocturnal Voices aims to shine a light on night-time workers, not just
          in London but worldwide, creating a collective map of voices covering
          an array of different topics in all languages. We hope to provide a
          platform where nocturnal voices can come together to contemplate, ease
          their loneliness or simply share their stories to the public, raising
          awareness of the realities of “nightlife” around the world.
        </div>
      </div>
    </div>
  );
};

export default About;
