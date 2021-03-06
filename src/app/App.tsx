import { Horizontal, Stretch, Vertical } from "gls/lib";
import * as React from "react";
import { Sidebar } from "../features/sidebar/Sidebar";
import { backgroundColor } from "../styles";
import { SavePodcastModal } from "../features/podcasts/savePodcast/SavePodcastModal";
import { PodcastDetails } from "../features/podcasts/podcastDetails/PodcastDetails";
import { PodcastPlayer } from "../features/player/PodcastPlayer";
import { useSelector } from "./store";
import { selectSelectedPodcast } from "../features/podcasts/podcastsSlice";
import { ConnectedSidebar } from "../features/sidebar/ConnectedSidebar";
import { ConnectedPodcastDetails } from "../features/podcasts/podcastDetails/ConnectedPodcastDetails";
import { ConnectedSavePodcastModal } from "../features/podcasts/savePodcast/ConnectedSavePodcastModal";

interface Props {}

export const App: React.FC<Props> = ({}) => {
  const selectedPodcast = useSelector(selectSelectedPodcast);

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
          <ConnectedSidebar />
          {selectedPodcast && (
            <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
              <ConnectedPodcastDetails podcast={selectedPodcast} />
            </div>
          )}
        </Horizontal>
      </Stretch>
      <PodcastPlayer />
      <ConnectedSavePodcastModal />
    </Vertical>
  );
};
