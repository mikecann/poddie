import { Horizontal, Stretch, Vertical } from "gls/lib";
import * as React from "react";
import { PodcastDetailsFeedItem } from "./PodcastDetailsFeedItem";
import { Alert, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { setFalse, setTrue } from "../../../utils/misc";
import { PodcastInfoModal } from "../podcastInfo/PodcastInfoModal";
import { SavedPodcast } from "../podcastsSlice";
import { Episode } from "../../episodes/episodesSlice";

interface Props {
  podcast: SavedPodcast;
  selectedEpisode: Episode | null;
  onEpisodeSelected: (episode: Episode) => any;
  onPlayEpisode: (episode: Episode) => any;
  episodes: Episode[];
  isLoading?: boolean;
  error?: string;
}

export const PodcastDetails: React.FC<Props> = ({
  podcast,
  episodes,
  isLoading,
  error,
  selectedEpisode,
  onEpisodeSelected,
  onPlayEpisode,
}) => {
  const [moreInfoOpen, setMoreInfoOpen] = React.useState(false);

  const {
    itunesInfo: { collectionName },
  } = podcast;

  return (
    <Vertical style={{ padding: 20, width: "100%" }} height="100%" spacing={20}>
      <Horizontal width="100%">
        <Stretch>
          <h1 style={{ color: "white" }}>{collectionName}</h1>
        </Stretch>
        <InfoCircleOutlined
          style={{ fontSize: "2em", cursor: "pointer", color: "white" }}
          onClick={setTrue(setMoreInfoOpen)}
        />
      </Horizontal>
      {isLoading && <Spin tip="Loading Feed..." />}
      {error && (
        <Alert message={"Feed Load Error!"} description={JSON.stringify(error)} type="error" />
      )}
      <Vertical spacing={5}>
        {episodes.map((episode, i) => (
          <PodcastDetailsFeedItem
            key={episode.id}
            isSelected={selectedEpisode?.id == episode.id}
            onSelect={() => onEpisodeSelected(episode)}
            item={episode.feedInfo}
            onPlayClicked={() => onPlayEpisode(episode)}
          />
        ))}
      </Vertical>

      <PodcastInfoModal
        podcast={podcast.itunesInfo}
        visible={moreInfoOpen}
        onClose={setFalse(setMoreInfoOpen)}
      />
    </Vertical>
  );
};
