import { Horizontal, Vertical, HorizontalSpacer, Stretch } from "gls/lib";
import * as React from "react";
import { PodcastSearchItem } from "../podcasts/podcastsSlice";

interface Props {
  podcast: PodcastSearchItem;
  onSelect: () => any;
  isSelected: boolean;
}

export const SidebarPodcastItem: React.FC<Props> = ({ podcast, onSelect, isSelected }) => {
  const [over, setOver] = React.useState(false);
  const { artworkUrl100, collectionName } = podcast;
  return (
    <Horizontal
      spacing={20}
      onClick={onSelect}
      onMouseOver={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
      style={{
        cursor: isSelected ? undefined : "pointer",
        backgroundColor: isSelected
          ? "rgba(255,255,255,0.1)"
          : over
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.03)",
      }}
      verticalAlign="center"
    >
      <img src={artworkUrl100} />
      <Stretch>
        <Vertical verticalAlign="center">
          <h4 style={{ color: "white" }}>{collectionName}</h4>
        </Vertical>
      </Stretch>

      <HorizontalSpacer space={20} />
    </Horizontal>
  );
};
