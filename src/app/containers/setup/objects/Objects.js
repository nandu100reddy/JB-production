import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import List from "./common/List";
import View from "./common/View";
import Create from "./common/Create";
import Chat from "../../frontendUser/chat/Chat";

const Objects = (props) => {
  return (
    <>
      <div className="objectWrapper">
        <List applicationId={props.applicationId} />
      </div>
      <Chat />
    </>
  );
};

export default Objects;
