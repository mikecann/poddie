import { Horizontal, Vertical } from "gls/lib";
import * as React from "react";
import { searchPodcasts } from "./features/podcasts";
import { Sidebar } from "./sidebar/Sidebar";
import { backgroundColor } from "./styles";

interface Props {}

export const App: React.FC<Props> = ({}) => {
  
  return (
    <Vertical>
      <Horizontal
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: backgroundColor.toHexString(),
          color: "white",
        }}
      >
        <Sidebar />
        <Vertical>episodes</Vertical>
      </Horizontal>
      <Horizontal>player</Horizontal>
    </Vertical>
  );
};
