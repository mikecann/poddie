import { Horizontal, Stretch, Vertical } from "gls/lib";
import * as React from "react";
import {
  addedPodcastsAtom,
  searchPodcasts,
  selectedPodcastIdAtom,
} from "./features/podcasts";
import { Sidebar } from "./sidebar/Sidebar";
import { backgroundColor } from "./styles";
import { AddPodcastModal } from "./addPodcast/AddPodcastModal";
import { useAtom } from "jotai";
import { PodcastDetails } from "./podcastDetails/PodcastDetails";
import { PodcastPlayer } from "./player/PodcastPlayer";
import { PodcastInfoModal } from "./podcastInfo/PodcastInfoModal";

interface Props {}

export const App: React.FC<Props> = ({}) => {
  const [selectedPodcastId, setSelectedPodcastId] = useAtom(
    selectedPodcastIdAtom
  );

  const [addedPodcasts] = useAtom(addedPodcastsAtom);

  const selectedPodcast = addedPodcasts.find(
    (p) => p.collectionId == selectedPodcastId
  );

  return (
    <Vertical
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Stretch>
        <Horizontal
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: backgroundColor.toHexString(),
            color: "white",
          }}
        >
          <Sidebar />
          {selectedPodcast && (
            <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
              <PodcastDetails podcast={selectedPodcast} />
            </div>
          )}
        </Horizontal>
      </Stretch>
      <PodcastPlayer />
      <PodcastInfoModal />
      <AddPodcastModal />
    </Vertical>
  );
};
