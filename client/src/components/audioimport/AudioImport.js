import React, { useState, useEffect } from "react";
import Logo from "../../assets/img/chat.png";
import { addVoicenote } from "./Axios";
import Swal from "sweetalert2";
import useRecorder from "./useRecorder";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AudioImport = ({
  audioimportOpen,
  coords,
  country_name,
  city_name,
  setcountry_name,
  setcity_name,
  //menu playr
  audioimportOpenHandler,
}) => {
  const [isloading, setisloading] = useState(false);
  const [isaudio, setisaudio] = useState();
  const [recordOption, setrecordOption] = useState();
  const [isaudiofile, setisaudiofile] = useState();
  const [istitle, setistitle] = useState("");
  const [isutctime, setisutctime] = useState("");
  const [nogpsHandler, setnogpsHandler] = useState(true);
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  useEffect(() => {
    if (audioURL === "") return;
    let reader = new FileReader();
    reader.readAsDataURL(audioURL);
    reader.onload = () => {
      setrecordOption("record");
      setisaudio(reader.result);
    };
  }, [audioURL]);

  useEffect(() => {
    let x = new Date().getTimezoneOffset();
    x = x / 60;
    if (Math.sign(x) > 0) {
      setisutctime("UTC -" + x);
    } else {
      setisutctime("UTC +" + Math.abs(x));
    }
  }, []);

  const inputHandler = (e) => {
    if (e.target.name === "country_name") {
      setcountry_name(e.target.value);
    }
    if (e.target.name === "city_name") {
      setcity_name(e.target.value);
    }
    if (e.target.name === "istitle") {
      setistitle(e.target.value);
    }

    if (e.target.name === "isaudio") {
      if (!(e.target.files[0] === undefined)) {
        if (e.target.files[0].type.includes("audio")) {
          if (Math.round(e.target.files[0].size / 1000) <= 500) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              setrecordOption("import");
              setisaudio(reader.result);
              if (istitle === "") {
                setistitle(file.name);
              }
            };
          } else {
            setisaudio();
            setisaudiofile();
            Swal.fire({
              icon: "error",
              html: `<div class="voicenote-save">Audio size is too big</div>`,
              toast: true,
              position: "top",
              timer: 1000,
              timerProgressBar: false,
              showConfirmButton: false,
            });
          }
        } else {
          setisaudio();
          setisaudiofile();
          Swal.fire({
            icon: "error",
            html: `<div class="voicenote-save">Just Audio Files</div>`,
            toast: true,
            position: "top",
            timer: 1000,
            timerProgressBar: false,
            showConfirmButton: false,
          });
        }
      } else {
        setisaudio();
        setisaudiofile();
      }
    }
  };
  const uploadHandler = async () => {
    if (isaudio === undefined) {
      Swal.fire({
        icon: "error",
        html: `<div class="voicenote-save">Please record and import a new audio</div>`,
        toast: true,
        position: "top",
        timer: 1000,
        timerProgressBar: false,
        showConfirmButton: false,
      });
    } else {
      if (country_name === "" || city_name === "" || istitle === "") {
        Swal.fire({
          icon: "error",
          html: `<div class="voicenote-save">Please fill the information </div>`,
          toast: true,
          position: "top",
          timer: 1000,
          timerProgressBar: false,
          showConfirmButton: false,
        });
      } else {
        setisloading(true);
        setnogpsHandler(false);
        let uploadFile = await addVoicenote(
          city_name,
          country_name,
          coords[0],
          coords[1],
          istitle,
          isaudio,
          isutctime
        );
        if (uploadFile.status === "VALID") {
          setisloading(false);
          audioimportOpenHandler(false);
          setistitle("");
          setisaudio();
          setisaudiofile();
          Swal.fire({
            icon: "success",
            html: `<div class="voicenote-save">Audio was added</div>`,
            toast: true,
            position: "top",
            timer: 1000,
            timerProgressBar: false,
            showConfirmButton: false,
          });
        }
      }
    }
  };

  return (
    <>
      {isloading ? (
        <div className="loadingAudio ">
          <div className="laodingtitle">LOADING</div>
        </div>
      ) : (
        ""
      )}

      <div
        className={`text-left ${
          audioimportOpen ? "audioimportOpen-rules" : "audioimportClose-rules"
        }`}
      >
        <div>Rules for submission:</div>
        <br />
        <div>
          1) A clear mp3 file of your voice. Background noise is okay (MP3
          format and under 500kb only)
        </div>
        <div>
          2) People who submit voice messages are those who work between the
          times 6pm - 6am. All time zones, any job, any hours, anywhere.
        </div>
        <div>
          3) In the language you feel most comfortable in. All languages and
          dialects are welcome.
        </div>
      </div>

      <div className={audioimportOpen ? "audioimportOpen" : "audioimportClose"}>
        <div
          style={{
            padding: "10px",
          }}
        >
          <div className="container ">
            <div
              className="text-center"
              style={{ transform: "translateY(-35px)" }}
            >
              <img
                src={Logo}
                alt="Logo for Nocturnal Voices"
                style={{
                  height: "50px",
                }}
              />
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bolder",
                  color: "#495fef",
                }}
              >
                Whats on your mind?
              </div>
              {isaudio === undefined ? (
                ""
              ) : (
                <AudioPlayer
                  autoPlay
                  src={isaudio}
                  showSkipControls={false}
                  showJumpControls={false}
                />
              )}
              {recordOption === "record" || recordOption === undefined ? (
                <>
                  <button
                    className="media-icon text-white recording-style"
                    onClick={startRecording}
                    disabled={isRecording}
                  >
                    Record
                  </button>
                  <button
                    className="media-icon text-white recording-style"
                    onClick={stopRecording}
                    disabled={!isRecording}
                  >
                    stop
                  </button>
                </>
              ) : (
                ""
              )}
              <div className="folio-form">
                <input
                  className="form-control text-white font-weight-bold"
                  type="text"
                  name="istitle"
                  value={istitle}
                  onChange={(e) => inputHandler(e)}
                  placeholder="Title of Audio"
                />
                {recordOption === "import" || recordOption === undefined ? (
                  <input
                    className=" rod-file-input form-control text-white media-icon"
                    type="file"
                    name="isaudio"
                    accept="audio/*"
                    value={isaudiofile}
                    onChange={(e) => inputHandler(e)}
                    placeholder="Voice Note"
                  />
                ) : (
                  ""
                )}
                {nogpsHandler ? (
                  <>
                    <select
                      className="form-control text-white font-weight-bold country-scroll"
                      type="select"
                      name="country_name"
                      value={country_name}
                      onChange={(e) => inputHandler(e)}
                      placeholder="Country"
                    >
                      <option className="drop-menu-item">Aruba</option>
                      <option className="drop-menu-item">Afghanistan</option>
                      <option className="drop-menu-item">Angola</option>
                      <option className="drop-menu-item">Anguilla</option>
                      <option className="drop-menu-item">Albania</option>
                      <option className="drop-menu-item">Aland</option>
                      <option className="drop-menu-item">Andorra</option>
                      <option className="drop-menu-item">
                        United Arab Emirates
                      </option>
                      <option className="drop-menu-item">Argentina</option>
                      <option className="drop-menu-item">Armenia</option>
                      <option className="drop-menu-item">American Samoa</option>
                      <option className="drop-menu-item">Antarctica</option>
                      <option className="drop-menu-item">
                        Ashmore and Cartier Islands
                      </option>
                      <option className="drop-menu-item">
                        French Southern and Antarctic Lands
                      </option>
                      <option className="drop-menu-item">
                        Antigua and Barbuda
                      </option>
                      <option className="drop-menu-item">Australia</option>
                      <option className="drop-menu-item">Austria</option>
                      <option className="drop-menu-item">Azerbaijan</option>
                      <option className="drop-menu-item">Burundi</option>
                      <option className="drop-menu-item">Belgium</option>
                      <option className="drop-menu-item">Benin</option>
                      <option className="drop-menu-item">Burkina Faso</option>
                      <option className="drop-menu-item">Bangladesh</option>
                      <option className="drop-menu-item">Bulgaria</option>
                      <option className="drop-menu-item">Bahrain</option>
                      <option className="drop-menu-item">The Bahamas</option>
                      <option className="drop-menu-item">
                        Bosnia and Herzegovina
                      </option>
                      <option className="drop-menu-item">
                        Bajo Nuevo Bank (Petrel Is.)
                      </option>
                      <option className="drop-menu-item">
                        Saint Barthelemy
                      </option>
                      <option className="drop-menu-item">Belarus</option>
                      <option className="drop-menu-item">Belize</option>
                      <option className="drop-menu-item">Bermuda</option>
                      <option className="drop-menu-item">Bolivia</option>
                      <option className="drop-menu-item">Brazil</option>
                      <option className="drop-menu-item">Barbados</option>
                      <option className="drop-menu-item">Brunei</option>
                      <option className="drop-menu-item">Bhutan</option>
                      <option className="drop-menu-item">Botswana</option>
                      <option className="drop-menu-item">
                        Central African Republic
                      </option>
                      <option className="drop-menu-item">Canada</option>
                      <option className="drop-menu-item">Switzerland</option>
                      <option className="drop-menu-item">Chile</option>
                      <option className="drop-menu-item">China</option>
                      <option className="drop-menu-item">Ivory Coast</option>
                      <option className="drop-menu-item">
                        Clipperton Island
                      </option>
                      <option className="drop-menu-item">Cameroon</option>
                      <option className="drop-menu-item">
                        Cyprus No Mans Area
                      </option>
                      <option className="drop-menu-item">
                        Democratic Republic of the Congo
                      </option>
                      <option className="drop-menu-item">
                        Republic of Congo
                      </option>
                      <option className="drop-menu-item">Cook Islands</option>
                      <option className="drop-menu-item">Colombia</option>
                      <option className="drop-menu-item">Comoros</option>
                      <option className="drop-menu-item">Cape Verde</option>
                      <option className="drop-menu-item">Costa Rica</option>
                      <option className="drop-menu-item">
                        Coral Sea Islands
                      </option>
                      <option className="drop-menu-item">Cuba</option>
                      <option className="drop-menu-item">Curaçao</option>
                      <option className="drop-menu-item">Cayman Islands</option>
                      <option className="drop-menu-item">
                        Northern Cyprus
                      </option>
                      <option className="drop-menu-item">Cyprus</option>
                      <option className="drop-menu-item">Czech Republic</option>
                      <option className="drop-menu-item">Germany</option>
                      <option className="drop-menu-item">Djibouti</option>
                      <option className="drop-menu-item">Dominica</option>
                      <option className="drop-menu-item">Denmark</option>
                      <option className="drop-menu-item">
                        Dominican Republic
                      </option>
                      <option className="drop-menu-item">Algeria</option>
                      <option className="drop-menu-item">Ecuador</option>
                      <option className="drop-menu-item">Egypt</option>
                      <option className="drop-menu-item">Eritrea</option>
                      <option className="drop-menu-item">
                        Dhekelia Sovereign Base Area
                      </option>
                      <option className="drop-menu-item">Spain</option>
                      <option className="drop-menu-item">Estonia</option>
                      <option className="drop-menu-item">Ethiopia</option>
                      <option className="drop-menu-item">Finland</option>
                      <option className="drop-menu-item">Fiji</option>
                      <option className="drop-menu-item">
                        Falkland Islands
                      </option>
                      <option className="drop-menu-item">France</option>
                      <option className="drop-menu-item">Faroe Islands</option>
                      <option className="drop-menu-item">
                        Federated States of Micronesia
                      </option>
                      <option className="drop-menu-item">Gabon</option>
                      <option className="drop-menu-item">United Kingdom</option>
                      <option className="drop-menu-item">Georgia</option>
                      <option className="drop-menu-item">Guernsey</option>
                      <option className="drop-menu-item">Ghana</option>
                      <option className="drop-menu-item">Gibraltar</option>
                      <option className="drop-menu-item">Guinea</option>
                      <option className="drop-menu-item">Gambia</option>
                      <option className="drop-menu-item">Guinea Bissau</option>
                      <option className="drop-menu-item">
                        Equatorial Guinea
                      </option>
                      <option className="drop-menu-item">Greece</option>
                      <option className="drop-menu-item">Grenada</option>
                      <option className="drop-menu-item">Greenland</option>
                      <option className="drop-menu-item">Guatemala</option>
                      <option className="drop-menu-item">Guam</option>
                      <option className="drop-menu-item">Guyana</option>
                      <option className="drop-menu-item">
                        Hong Kong S.A.R.
                      </option>
                      <option className="drop-menu-item">
                        Heard Island and McDonald Islands
                      </option>
                      <option className="drop-menu-item">Honduras</option>
                      <option className="drop-menu-item">Croatia</option>
                      <option className="drop-menu-item">Haiti</option>
                      <option className="drop-menu-item">Hungary</option>
                      <option className="drop-menu-item">Indonesia</option>
                      <option className="drop-menu-item">Isle of Man</option>
                      <option className="drop-menu-item">India</option>
                      <option className="drop-menu-item">
                        Indian Ocean Territories
                      </option>
                      <option className="drop-menu-item">
                        British Indian Ocean Territory
                      </option>
                      <option className="drop-menu-item">Ireland</option>
                      <option className="drop-menu-item">Iran</option>
                      <option className="drop-menu-item">Iraq</option>
                      <option className="drop-menu-item">Iceland</option>
                      <option className="drop-menu-item">Israel</option>
                      <option className="drop-menu-item">Italy</option>
                      <option className="drop-menu-item">Jamaica</option>
                      <option className="drop-menu-item">Jersey</option>
                      <option className="drop-menu-item">Jordan</option>
                      <option className="drop-menu-item">Japan</option>
                      <option className="drop-menu-item">
                        Baykonur Cosmodrome
                      </option>
                      <option className="drop-menu-item">
                        Siachen Glacier
                      </option>
                      <option className="drop-menu-item">Kazakhstan</option>
                      <option className="drop-menu-item">Kenya</option>
                      <option className="drop-menu-item">Kyrgyzstan</option>
                      <option className="drop-menu-item">Cambodia</option>
                      <option className="drop-menu-item">Kiribati</option>
                      <option className="drop-menu-item">
                        Saint Kitts and Nevis
                      </option>
                      <option className="drop-menu-item">South Korea</option>
                      <option className="drop-menu-item">Kosovo</option>
                      <option className="drop-menu-item">Kuwait</option>
                      <option className="drop-menu-item">Laos</option>
                      <option className="drop-menu-item">Lebanon</option>
                      <option className="drop-menu-item">Liberia</option>
                      <option className="drop-menu-item">Libya</option>
                      <option className="drop-menu-item">Saint Lucia</option>
                      <option className="drop-menu-item">Liechtenstein</option>
                      <option className="drop-menu-item">Sri Lanka</option>
                      <option className="drop-menu-item">Lesotho</option>
                      <option className="drop-menu-item">Lithuania</option>
                      <option className="drop-menu-item">Luxembourg</option>
                      <option className="drop-menu-item">Latvia</option>
                      <option className="drop-menu-item">Macao S.A.R</option>
                      <option className="drop-menu-item">Saint Martin</option>
                      <option className="drop-menu-item">Morocco</option>
                      <option className="drop-menu-item">Monaco</option>
                      <option className="drop-menu-item">Moldova</option>
                      <option className="drop-menu-item">Madagascar</option>
                      <option className="drop-menu-item">Maldives</option>
                      <option className="drop-menu-item">Mexico</option>
                      <option className="drop-menu-item">
                        Marshall Islands
                      </option>
                      <option className="drop-menu-item">Macedonia</option>
                      <option className="drop-menu-item">Mali</option>
                      <option className="drop-menu-item">Malta</option>
                      <option className="drop-menu-item">Myanmar</option>
                      <option className="drop-menu-item">Montenegro</option>
                      <option className="drop-menu-item">Mongolia</option>
                      <option className="drop-menu-item">
                        Northern Mariana Islands
                      </option>
                      <option className="drop-menu-item">Mozambique</option>
                      <option className="drop-menu-item">Mauritania</option>
                      <option className="drop-menu-item">Montserrat</option>
                      <option className="drop-menu-item">Mauritius</option>
                      <option className="drop-menu-item">Malawi</option>
                      <option className="drop-menu-item">Malaysia</option>
                      <option className="drop-menu-item">Namibia</option>
                      <option className="drop-menu-item">New Caledonia</option>
                      <option className="drop-menu-item">Niger</option>
                      <option className="drop-menu-item">Norfolk Island</option>
                      <option className="drop-menu-item">Nigeria</option>
                      <option className="drop-menu-item">Nicaragua</option>
                      <option className="drop-menu-item">Niue</option>
                      <option className="drop-menu-item">Netherlands</option>
                      <option className="drop-menu-item">Norway</option>
                      <option className="drop-menu-item">Nepal</option>
                      <option className="drop-menu-item">Nauru</option>
                      <option className="drop-menu-item">New Zealand</option>
                      <option className="drop-menu-item">Oman</option>
                      <option className="drop-menu-item">Pakistan</option>
                      <option className="drop-menu-item">Panama</option>
                      <option className="drop-menu-item">
                        Pitcairn Islands
                      </option>
                      <option className="drop-menu-item">Peru</option>
                      <option className="drop-menu-item">
                        Spratly Islands
                      </option>
                      <option className="drop-menu-item">Philippines</option>
                      <option className="drop-menu-item">Palau</option>
                      <option className="drop-menu-item">
                        Papua New Guinea
                      </option>
                      <option className="drop-menu-item">Poland</option>
                      <option className="drop-menu-item">Puerto Rico</option>
                      <option className="drop-menu-item">North Korea</option>
                      <option className="drop-menu-item">Portugal</option>
                      <option className="drop-menu-item">Paraguay</option>
                      <option className="drop-menu-item">Palestine</option>
                      <option className="drop-menu-item">
                        French Polynesia
                      </option>
                      <option className="drop-menu-item">Qatar</option>
                      <option className="drop-menu-item">Romania</option>
                      <option className="drop-menu-item">Russia</option>
                      <option className="drop-menu-item">Rwanda</option>
                      <option className="drop-menu-item">Western Sahara</option>
                      <option className="drop-menu-item">Saudi Arabia</option>
                      <option className="drop-menu-item">
                        Scarborough Reef
                      </option>
                      <option className="drop-menu-item">Sudan</option>
                      <option className="drop-menu-item">South Sudan</option>
                      <option className="drop-menu-item">Senegal</option>
                      <option className="drop-menu-item">
                        Serranilla Bank
                      </option>
                      <option className="drop-menu-item">Singapore</option>
                      <option className="drop-menu-item">
                        South Georgia and South Sandwich Islands
                      </option>
                      <option className="drop-menu-item">Saint Helena</option>
                      <option className="drop-menu-item">
                        Solomon Islands
                      </option>
                      <option className="drop-menu-item">Sierra Leone</option>
                      <option className="drop-menu-item">El Salvador</option>
                      <option className="drop-menu-item">San Marino</option>
                      <option className="drop-menu-item">Somaliland</option>
                      <option className="drop-menu-item">Somalia</option>
                      <option className="drop-menu-item">
                        Saint Pierre and Miquelon
                      </option>
                      <option className="drop-menu-item">
                        Republic of Serbia
                      </option>
                      <option className="drop-menu-item">
                        Sao Tome and Principe
                      </option>
                      <option className="drop-menu-item">Suriname</option>
                      <option className="drop-menu-item">Slovakia</option>
                      <option className="drop-menu-item">Slovenia</option>
                      <option className="drop-menu-item">Sweden</option>
                      <option className="drop-menu-item">Swaziland</option>
                      <option className="drop-menu-item">Sint Maarten</option>
                      <option className="drop-menu-item">Seychelles</option>
                      <option className="drop-menu-item">Syria</option>
                      <option className="drop-menu-item">
                        Turks and Caicos Islands
                      </option>
                      <option className="drop-menu-item">Chad</option>
                      <option className="drop-menu-item">Togo</option>
                      <option className="drop-menu-item">Thailand</option>
                      <option className="drop-menu-item">Tajikistan</option>
                      <option className="drop-menu-item">Turkmenistan</option>
                      <option className="drop-menu-item">East Timor</option>
                      <option className="drop-menu-item">Tonga</option>
                      <option className="drop-menu-item">
                        Trinidad and Tobago
                      </option>
                      <option className="drop-menu-item">Tunisia</option>
                      <option className="drop-menu-item">Turkey</option>
                      <option className="drop-menu-item">Tuvalu</option>
                      <option className="drop-menu-item">Taiwan</option>
                      <option className="drop-menu-item">
                        United Republic of Tanzania
                      </option>
                      <option className="drop-menu-item">Uganda</option>
                      <option className="drop-menu-item">Ukraine</option>
                      <option className="drop-menu-item">
                        United States Minor Outlying Islands
                      </option>
                      <option className="drop-menu-item">Uruguay</option>
                      <option className="drop-menu-item">
                        United States of America
                      </option>
                      <option className="drop-menu-item">
                        US Naval Base Guantanamo Bay
                      </option>
                      <option className="drop-menu-item">Uzbekistan</option>
                      <option className="drop-menu-item">Vatican</option>
                      <option className="drop-menu-item">
                        Saint Vincent and the Grenadines
                      </option>
                      <option className="drop-menu-item">Venezuela</option>
                      <option className="drop-menu-item">
                        British Virgin Islands
                      </option>
                      <option className="drop-menu-item">
                        United States Virgin Islands
                      </option>
                      <option className="drop-menu-item">Vietnam</option>
                      <option className="drop-menu-item">Vanuatu</option>
                      <option className="drop-menu-item">
                        Wallis and Futuna
                      </option>
                      <option className="drop-menu-item">
                        Akrotiri Sovereign Base Area
                      </option>
                      <option className="drop-menu-item">Samoa</option>
                      <option className="drop-menu-item">Yemen</option>
                      <option className="drop-menu-item">South Africa</option>
                      <option className="drop-menu-item">Zambia</option>
                      <option className="drop-menu-item">Zimbabwe</option>
                    </select>
                    <input
                      className="form-control text-white font-weight-bold"
                      type="text"
                      name="city_name"
                      value={city_name}
                      onChange={(e) => inputHandler(e)}
                      placeholder="City"
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  height: "45px",
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#495fef",
                  fontWeight: "bolder",
                  fontSize: "15px",
                  borderColor: "transparent",
                }}
                className="media-icon text-white"
                onClick={() => uploadHandler()}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioImport;
