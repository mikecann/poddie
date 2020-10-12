import { Horizontal, Stretch, Vertical } from "gls/lib";
import * as React from "react";
import { Sidebar } from "./sidebar/Sidebar";
import { backgroundColor } from "./styles";
import { AddPodcastModal } from "./addPodcast/AddPodcastModal";
import { PodcastDetails } from "./podcastDetails/PodcastDetails";
import { PodcastPlayer } from "./player/PodcastPlayer";
import { useStore } from "effector-react";
import { selectedPodcastStore } from "./state/app";

interface Props {}

export const App: React.FC<Props> = ({}) => {
  const selectedPodcast = useStore(selectedPodcastStore);

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
      <AddPodcastModal />
    </Vertical>
  );
};
