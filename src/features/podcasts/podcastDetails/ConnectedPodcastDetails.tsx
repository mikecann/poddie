import * as React from "react";
import { PodcastDetails } from "./PodcastDetails";
import { useDispatch } from "react-redux";
import { SavedPodcast, loadEpisodes } from "../podcastsSlice";
import { downloadEpisode, Episode, selectEpisodesForPodcast } from "../../episodes/episodesSlice";
import { useSelector } from "../../../app/store";

interface Props {
  podcast: SavedPodcast;
}

export const ConnectedPodcastDetails: React.FC<Props> = ({ podcast }) => {
  const episodes = useSelector(selectEpisodesForPodcast(podcast.id));
  const dispatch = useDispatch();
  const [selectedEpisode, setSelectedEpisode] = React.useState<Episode | null>(null);

  React.useEffect(() => {
    dispatch(loadEpisodes(podcast));
  }, [podcast.id]);

  return (
    <PodcastDetails
      episodes={episodes}
      onEpisodeSelected={setSelectedEpisode}
      podcast={podcast}
      selectedEpisode={selectedEpisode}
      error={""}
      isLoading={false}
      onPlayEpisode={(episode) => dispatch(downloadEpisode(episode))}
    />
  );
};
