import { Horizontal, Vertical } from "gls/lib";
import * as React from "react";
import { Podcast } from "../features/podcasts";

interface Props {
  podcast: Podcast;
}

export const SidebarPodcastItem: React.FC<Props> = ({ podcast }) => {
  const { name } = podcast;
  return (
    <Horizontal>
      <div>img</div>
      <Vertical>
        <div>{name}</div>
        <div>date last episode</div>
      </Vertical>
    </Horizontal>
  );
};
