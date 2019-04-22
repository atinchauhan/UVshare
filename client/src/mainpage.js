import React, { Component } from "react";
import {Link} from "react-router-dom";

const Mainpage=()=>{
  return (
  <div>
  <p> <b>hello this is main page </b></p>
  <Link to ="/add" > Upload</Link>

  </div>
  );
};
export default Mainpage;