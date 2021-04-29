import React, { useState, useEffect } from "react";

const TimeFooter = () => {
  const [istime, setistime] = useState(0);
  const [isutctime, setisutctime] = useState("");
  useEffect(() => {
    let intervalID;

    intervalID = setInterval(() => {
      setistime((prev) => prev + 1);
      let x = new Date().toISOString();
      setisutctime(`${x.substr(11, 8)} UTC`);
    }, 1000);
    return () => clearInterval(intervalID);
  }, [istime]);
  return <div className="time-footer">{isutctime}</div>;
};

export default TimeFooter;
