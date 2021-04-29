import React from "react";
import { GeoJSON } from "react-leaflet";

const Country = ({ data }) => {
  if (data.length === 0) {
    return false;
  } else {
    return (
      <GeoJSON
        data={data}
        style={{
          color: "rgb(0,200,100)",
          fillColor: "rgb(0,200,100)",
          fillOpacity: "0.1",
          weight: "2",
          dashArray: "10",
          zindex: "0",
        }}
      />
    );
  }
};

export default Country;
