import { Button } from "antd";
import { useStore } from "effector-react";
import { Vertical } from "gls/lib";
import * as React from "react";
import { appStateStore, openModal, selectPodcast } from "../state/app";
import { backgroundColor } from "../styles";
import { SidebarPodcastItem } from "./SidebarPodcastItem";

interface Props {}

export const Sidebar: React.FC<Props> = ({}) => {
  const { savedPodcasts, selectedPodcastId } = useStore(appStateStore);

  const onAddPodcastClicked = () => openModal("addPodcast");

  return (
    <Vertical
      style={{
        width: 300,
        backgroundColor: backgroundColor.darken(0.05).toHexString(),
      }}
    >
      {savedPodcasts.map((p) => (
        <SidebarPodcastItem
          key={p.collectionId}
          podcast={p}
          isSelected={p.collectionId == selectedPodcastId}
          onSelect={() => selectPodcast(p.collectionId)}
        />
      ))}
      <Vertical style={{ padding: 10 }}>
        <Button onClick={onAddPodcastClicked}>Add Podcast</Button>
      </Vertical>
    </Vertical>
  );
};
