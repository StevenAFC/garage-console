import React from "react";
import { Header, Segment } from "semantic-ui-react";
import AtmosphereStats from "./AtmosphereStats";
import PiSystemStats from "./PiSystemStats";

const Stats = () => {
  return (
    <div>
      <Header attached="top">Garage Environment</Header>
      <Segment attached>
        <AtmosphereStats />
      </Segment>
      <Header attached="top">System</Header>
      <Segment attached>
        <PiSystemStats />
      </Segment>
    </div>
  );
};

export default Stats;
