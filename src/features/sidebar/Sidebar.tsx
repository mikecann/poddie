import { Button } from "antd";
import { Vertical } from "gls/lib";
import * as React from "react";
import { backgroundColor } from "../../styles";
import { SidebarPodcastItem } from "./SidebarPodcastItem";
import { PodcastId, SavedPodcast, selectPodcast } from "../podcasts/podcastsSlice";

interface Props {
  savedPodcasts: SavedPodcast[];
  selectedPodcastId: PodcastId | null;
  onAddPodcast: () => any;
  onSelectPodcast: (id: PodcastId) => any;
}

export const Sidebar: React.FC<Props> = ({
  savedPodcasts,
  selectedPodcastId,
  onAddPodcast,
  onSelectPodcast,
}) => {
  return (
    <Vertical
      height="100%"
      style={{
        width: 300,
        backgroundColor: backgroundColor.darken(0.05).toHexString(),
      }}
    >
      {Object.values(savedPodcasts).map((p) => (
        <SidebarPodcastItem
          key={p.id}
          podcast={p.itunesInfo}
          isSelected={p.id == selectedPodcastId}
          onSelect={() => onSelectPodcast(p.id)}
        />
      ))}
      <Vertical style={{ padding: 10 }}>
        <Button onClick={onAddPodcast}>Add Podcast</Button>
      </Vertical>
    </Vertical>
  );
};
