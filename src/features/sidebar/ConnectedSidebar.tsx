import * as React from "react";
import { useDispatch, useSelector } from "../../app/store";
import { openModal } from "../modals/modalsSlice";
import { Sidebar } from "./Sidebar";
import { selectPodcast } from "../podcasts/podcastsSlice";

interface Props {}

export const ConnectedSidebar: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const { savedPodcasts, selectedPodcastId } = useSelector((state) => state.podcasts);

  return (
    <Sidebar
      savedPodcasts={Object.values(savedPodcasts)}
      selectedPodcastId={selectedPodcastId}
      onAddPodcast={() => dispatch(openModal("savePodcast"))}
      onSelectPodcast={(podcastId) => dispatch(selectPodcast(podcastId))}
    />
  );
};
