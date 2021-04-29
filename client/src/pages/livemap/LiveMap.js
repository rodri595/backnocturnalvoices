/* eslint-disable */
import React, { useState, useEffect } from "react";
import AudioImport from "../../components/audioimport/AudioImport";
import AudioMap from "../../components/audioMap/AudioMap";
import Footer from "../../components/Footer/Footer";
import CircleUser from "../../components/audioMap/CircleUser";
import PlayerButton from "../../components/player/PlayerButton";
import Player from "../../components/player/Player";
import Rules from "../../components/rules/Rules";
//
import Swal from "sweetalert2/src/sweetalert2.js";
import useSound from "use-sound";
import audio from "../../assets/audio/switchon.mp3";
import { cerebro, check } from "./axios";
import TimeFooter from "../../components/time/TimeFooter";
import Country from "../../components/audioMap/Country";
import Countries from "../../components/audioMap/countries.json";
import PlayerMenu from "../../components/player/PlayerMenu";
import About from "../../components/about/About";
//
const LiveMap = () => {
  //OPEN menu
  const [ishammenu, setishammenu] = useState(false);
  //import menu
  const [isaudioImportOpen, setisaudioImportOpen] = useState(false);
  //set utc time for player
  const [isutc, setisutc] = useState("");
  //set Coords zooming on new coords
  const [ismapzoomcoords, setismapzoomcoords] = useState([0, 0]);
  //set Coords for adding audio on import
  const [iscoords, setiscoords] = useState([0, 0]);
  //set city and country
  const [iscountry_name, setiscountry_name] = useState("");
  const [iscity_name, setiscity_name] = useState("");
  //rules menu
  const [isopenrulez, setisopenrulez] = useState(true);
  //about menu
  const [isopenabout, setisopenabout] = useState(false);
  //audio menu
  const [ismenuOpen, setismenuOpen] = useState(false);
  //safe data from backend
  const [isapidata, setisapidata] = useState([]);
  //data for GEOJSON
  const [isdatageojson, setisdatageojson] = useState([]);
  const [isgeojsonactive, setisgeojsonactive] = useState(false);

  //data receive from when click on map
  const [isaudioClick, setisaudioClick] = useState([]);

  //audio data for player
  const [iscity, setiscity] = useState("Planet");
  const [iscountry, setiscountry] = useState("Earth");
  const [isaudioFile, setisaudioFile] = useState();
  const [isTitle, setisTitle] = useState("");
  //loading page and avoid effect glitch
  const [isloading, setisloading] = useState(true);
  //audio setup not necessary if done in vainilla js
  const [play] = useSound(audio, {
    volume: 0.5,
  });

  useEffect(() => {
    let intervalID;
    intervalID = setInterval(() => {
      handler();
    }, 5000);
    return () => clearInterval(intervalID);
  }, [isapidata]);

  const playerHnadler = (side) => {
    if (side === "->") {
      isapidata.map((o, i) => {
        if (isaudioClick._id === o._id) {
          if (isapidata.length - 1 === i) {
            setisaudioClick(isapidata[0]);
          } else {
            setisaudioClick(isapidata[i + 1]);
          }
        }
      });
    } else {
      isapidata.map((o, i) => {
        if (isaudioClick._id === o._id) {
          if (i === 0) {
            setisaudioClick(isapidata[isapidata.length - 1]);
          } else {
            setisaudioClick(isapidata[i - 1]);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (isloading) {
      setisloading(false);
    } else {
      dataHandlerMusic();
    }
  }, [isaudioClick]);

  const dataHandlerMusic = () => {
    setisutc(isaudioClick.utc);
    setismapzoomcoords(isaudioClick.coords);
    setisaudioFile(isaudioClick.base64audio);
    setisTitle(isaudioClick.title);
    setiscity(isaudioClick.city);
    setiscountry(isaudioClick.country);
  };

  const handler = () => {
    if (isapidata.length === 0) {
      getApi();
    } else {
      getApi2();
    }
  };
  const getApi = async () => {
    let apiData = await cerebro();
    setisapidata(apiData.data.markers);
  };
  const getApi2 = async () => {
    let apiData = await check(isapidata.length);
    if (apiData.status === "GOOD") {
      let apiData = await cerebro();
      if (!(isapidata.length === apiData.data.markers.length)) {
        apiData.data.markers.filter((o, i) => {
          if (isapidata[i] === undefined) {
            o.new = true;
          }
        });
        geojsonHandler(apiData.data.markers);

        play();
        Swal.fire({
          icon: "success",
          html: `<div class="voicenote-save">New Audio</div>`,
          toast: true,
          position: "top-end",
          timer: 1000,
          timerProgressBar: false,
          showConfirmButton: false,
        });
      }
    }
  };

  const geojsonHandler = (data) => {
    setisgeojsonactive(false);
    var a = [];
    var b = [];
    data.map((o) => {
      if (o.new) {
        a.push(o.country);
      }
    });
    let unique = a.filter((item, i, ar) => ar.indexOf(item) === i);

    unique.map((z) => {
      Countries.features.map((i) => {
        if (z === i.properties.ADMIN) {
          b.push(i);
        }
      });
    });
    setisdatageojson(b);
    setisgeojsonactive(true);
    setisapidata(data);
  };

  return (
    <>
      <body>
        <PlayerButton sethammenu={setishammenu} />
        <PlayerMenu
          hammenu={ishammenu}
          sethammenu={setishammenu}
          setmenuOpen={setismenuOpen}
          audioimportOpenHandler={setisaudioImportOpen}
          setopenrulez={setisopenrulez}
          setopenabout={setisopenabout}
        />
        <Player
          sethammenu={setishammenu}
          audioTitle={isTitle}
          cityName={iscity}
          countryName={iscountry}
          voicenoteFile={isaudioFile}
          utc={isutc}
          isplayerHnadler={playerHnadler}
          //
          audioimportOpenHandler={setisaudioImportOpen}
          menuOpen={ismenuOpen}
          setmenuOpen={setismenuOpen}
          setopenrulez={setisopenrulez}
        />
        <AudioMap
          cityHandler={setiscity}
          countryHandler={setiscountry}
          userAudios={isapidata}
          setcoords={setiscoords}
          setcountry_name={setiscountry_name}
          setcity_name={setiscity_name}
          //
          mapzoomcoords={ismapzoomcoords}
          geojsondata={isgeojsonactive && <Country data={isdatageojson} />}
        >
          <CircleUser data={isapidata} audioClick={setisaudioClick} />
        </AudioMap>
        <AudioImport
          audioimportOpen={isaudioImportOpen}
          coords={iscoords}
          country_name={iscountry_name}
          city_name={iscity_name}
          setcountry_name={setiscountry_name}
          setcity_name={setiscity_name}
          audioimportOpenHandler={setisaudioImportOpen}
        />

        <Footer />
        <Rules setopenrulez={setisopenrulez} openrulez={isopenrulez} />

        <About openabout={isopenabout} setopenabout={setisopenabout} />
        <TimeFooter />
      </body>
    </>
  );
};

export default LiveMap;
