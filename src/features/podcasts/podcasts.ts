import Parser from "rss-parser";
import { existsSync } from "fs";
import { getEpisodeDownloadPath } from "../../utils/paths";
import { Podcast, PodcastId, ITunesAPIRequestResponse, Episode, EppisodeId } from "./podcastsSlice";
import { ensure } from "../../utils/misc";

export const getPodcastIdFromPodcast = (podcast: Podcast): PodcastId => podcast.collectionId;

export const getEpisodeIdFromEpisode = (episode: Episode): EppisodeId =>
  ensure(episode.guid, `episode must have a guid`);

export const createPodcast = (overrides?: Partial<Podcast>): Podcast => ({
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

export const hasEpisodeBeenDownloaded = (podcast: Podcast, episode: Episode) =>
  existsSync(getEpisodeDownloadPath(podcast, episode));
