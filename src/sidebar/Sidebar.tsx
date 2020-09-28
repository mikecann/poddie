import { Button } from "antd";
import { Vertical } from "gls/lib";
import { useAtom } from "jotai";
import * as React from "react";
import { useQuery } from "react-query";
import { addPodcastModalIsOpenAtom } from "../addPodcast/AddPodcastModal";
import {
  createPodcast,
  searchPodcasts,
  addedPodcastsAtom,
  selectedPodcastIdAtom,
} from "../features/podcasts";
import { backgroundColor } from "../styles";
import { SidebarPodcastItem } from "./SidebarPodcastItem";

interface Props {}

const tmpPodcast = createPodcast({
  name: "test posdcast",
});

export const Sidebar: React.FC<Props> = ({}) => {
  const [podcasts] = useAtom(addedPodcastsAtom);
  const [selectedPodcastId, setSelectedPodcastId] = useAtom(
    selectedPodcastIdAtom
  );
  const [_, setIsAddPodcastModalOpen] = useAtom(addPodcastModalIsOpenAtom);

  const onAddPodcastClicked = () => setIsAddPodcastModalOpen(true);

  return (
    <Vertical
      style={{
        width: 300,
        backgroundColor: backgroundColor.darken(0.05).toHexString(),
      }}
    >
      {podcasts.map((p) => (
        <SidebarPodcastItem
          key={p.collectionId}
          podcast={p}
          isSelected={p.collectionId == selectedPodcastId}
          onSelect={() => setSelectedPodcastId(p.collectionId)}
        />
      ))}
      <Vertical style={{ padding: 10 }}>
        <Button onClick={onAddPodcastClicked}>Add Podcast</Button>
      </Vertical>
    </Vertical>
  );
};
