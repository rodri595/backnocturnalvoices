/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Map, TileLayer, ZoomControl } from "react-leaflet";
import { NightRegion } from "react-leaflet-night-region";
import Swal from "sweetalert2/src/sweetalert2.js";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet/dist/leaflet.css";

const AudioMap = ({
  //current data when loading map to show on player
  cityHandler,
  countryHandler,
  //for circle marker data
  children,
  //coords for db
  setcoords,
  //names for adding to db
  setcountry_name,
  setcity_name,
  //coords for zooming when on click or changing audio
  mapzoomcoords,
  geojsondata,
}) => {
  const [isloading, setisloading] = useState(true);
  const [datajson, setdatajson] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (isloading) {
      setisloading(false);
    } else {
      zoomwhenchanged();
    }
  }, [mapzoomcoords]);

  const zoomwhenchanged = () => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    map.flyTo(mapzoomcoords, 8, {
      duration: 4,
    });
  };

  const init = async () => {
    let response = await fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((location) => {
        //grabbing name for player when loading
        countryHandler(location.country_name);
        setcountry_name(location.country_name);
        //saving name info for db
        setcity_name(location.city);
        cityHandler(location.city);
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;
        setcoords([location.latitude, location.longitude]);

        map.flyTo([location.latitude, location.longitude], 4, {
          duration: 1,
        });
      });

    if (response === undefined) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { current = {} } = mapRef;
          const { leafletElement: map } = current;
          setcoords([position.coords.latitude, position.coords.longitude]);
          map.flyTo([position.coords.latitude, position.coords.longitude], 14, {
            duration: 4,
          });
        },
        () => {
          Swal.fire({
            icon: "warning",
            html: `<div class="voicenote-save">For a better experience, please allow GPS permission</div>`,
            toast: true,
            position: "top",
            timer: 10000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  };

  return (
    <Map
      style={{ backgroundColor: "black" }}
      ref={mapRef}
      center={[0, 0]}
      zoom={2}
      maxZoom={19}
      minZoom={2}
      bounceAtZoomLimits={true}
      maxBoundsViscosity={0.95}
      zoomControl={false}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <ZoomControl position="topright" />
      <TileLayer
        // noWrap={true}
        url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        minZoom={0}
        maxZoom={22}
        subdomains="abcd"
        accessToken="Q6TlPD96qItYafHxj0s1kyNNU0DsHrLO95GdtHi64FISFxXecpHBAVTJ2KAOxm6b"
      />
      <NightRegion fillColor="#00345c" color="#495fef" />
      <MarkerClusterGroup
        style={{ zIndex: "10000" }}
        maxClusterRadius={40}
        spiderLegPolylineOptions={{
          weight: 1.5,
          color: "#495fef",
          opacity: 0.5,
        }}
      >
        {children}
      </MarkerClusterGroup>
      {geojsondata}
    </Map>
  );
};

export default AudioMap;
