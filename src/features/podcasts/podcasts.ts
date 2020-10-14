import Parser from "rss-parser";
import { existsSync } from "fs";
import { getEpisodeDownloadPath } from "../../utils/paths";
import {
  PodcastSearchItem,
  PodcastId,
  ITunesAPIRequestResponse,
  Episode,
  EpisodeId,
} from "./podcastsSlice";
import { ensure } from "../../utils/misc";

export const getPodcastIdFromPodcastSearchItem = (podcast: PodcastSearchItem): PodcastId =>
  podcast.collectionId + "";

export const getEpisodeIdFromEpisode = (episode: Episode): EpisodeId =>
  ensure(episode.guid, `episode must have a guid`);

export const createPodcast = (overrides?: Partial<PodcastSearchItem>): PodcastSearchItem => ({
  ...(overrides as any),
});

export const searchPodcasts = async (term: string) => {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${term}&entity=podcast&attributes=titleTerm,artistTerm&limit=200`
  );

  const json: ITunesAPIRequestResponse = await response.json();

  return json.results;
};

export const loadPodcastFeed = async (rssUrl: string) => {
  const parser = new Parser();
  const feed = await parser.parseURL(rssUrl);
  console.log("getPodcastFeed -> feed", feed);
  return feed;
};

export const hasEpisodeBeenDownloaded = (podcast: PodcastSearchItem, episode: Episode) =>
  existsSync(getEpisodeDownloadPath(podcast, episode));
