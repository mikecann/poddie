import { existsSync } from "fs";
import { getEpisodeDownloadPath } from "../../utils/paths";
import { PodcastId } from "./podcastsSlice";
import { ensure } from "../../utils/misc";
import { PodcastITunesInfo } from "../../api/itunes/types";
import { Episode } from "../episodes/episodesSlice";
import { Item } from "rss-parser";

export const getPodcastIdFromPodcastSearchItem = (podcast: PodcastITunesInfo): PodcastId =>
  podcast.collectionId + "";

export const hasEpisodeBeenDownloaded = (podcast: PodcastITunesInfo, episode: Episode) =>
  existsSync(getEpisodeDownloadPath(podcast, episode));

export const podcastRssFeedItemsToEpisodes = (podcastId: PodcastId, items: Item[]): Episode[] =>
  items.map((item) => ({
    id: ensure(item.guid, `episode must have a guid`),
    feedInfo: item,
    podcastId,
    downloadState: {
      status: "unknown",
    },
  }));
