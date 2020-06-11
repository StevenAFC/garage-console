import React from "react";
import Control from "./Control";
import { Grid, Segment } from "semantic-ui-react";

const ControlPanel = () => {
  return (
    <div>
      <Control name={"Garage Door Open"} id={1} />
      <Control name={"Lights"} id={5} />
      <Control name={"Garage Door Close"} id={6} />
    </div>
  );
};

export default ControlPanel;
