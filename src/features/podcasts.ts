import { Item } from "rss-parser";
import Parser from "rss-parser";
import { existsSync } from "fs";
import { getEpisodeDownloadPath } from "../utils/paths";

export interface ITunesAPIRequestResponse {
  resultCount: number;
  results: Podcast[];
}

export type Podcast = {
  name: string;
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  trackRentalPrice: number;
  collectionHdPrice: number;
  trackHdPrice: number;
  trackHdRentalPrice: number;
  releaseDate: Date;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
};

export type Episode = Item;

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
