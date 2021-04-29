/* eslint-disable */
import React from "react";
import { CircleMarker, Tooltip } from "react-leaflet";

const CircleUser = ({ data, audioClick }) => {
  if (data.lenght === 0) {
    return false;
  } else {
    return data.map((o) => {
      return (
        <div
          className="hello"
          style={{
            backgroundColor: "transparent",
            height: "50px",
            width: "50px",
            position: "absolute",
          }}
        >
          <CircleMarker
            key={o._id}
            className={o.new ? "new-user-onmap" : ""}
            onclick={() => audioClick(o)}
            center={o.coords}
            radius={5}
            fillColor={o.new ? "" : "#495fef"}
            color={o.new ? "" : "#495fef"}
          >
            <Tooltip>
              <div className="text-left">
                <strong>{o.city}</strong>
                <br />
                <em>{o.utc}</em>
              </div>
            </Tooltip>
          </CircleMarker>
        </div>
      );
    });
  }
};

export default CircleUser;
