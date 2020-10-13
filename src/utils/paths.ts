import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import path from "path";
import { app } from "electron";

import { ensure } from "./misc";
import { Podcast, Episode } from "../features/podcasts/podcastsSlice";

export function mkdirRecurse(inputPath: string) {
  if (existsSync(inputPath)) {
    return;
  }
  const basePath = dirname(inputPath);
  if (existsSync(basePath)) {
    mkdirSync(inputPath);
  }
  mkdirRecurse(basePath);
}

export const getExtensionFromUrl = (url: string, defaultValue = ".mp3") => {
  const extension = path.extname(url) ? path.extname(url) : defaultValue;
  return extension.split("?")[0];
};

export const getDownloadsDirectory = () => path.join(app.getPath("userData"), "/downloads");

export const getPodcastDownloadDirectory = (podcast: Podcast) =>
  path.join(getDownloadsDirectory(), podcast.collectionName || "misc");

export const getEpisodeRemoteUrl = (episode: Episode) => ensure(episode.enclosure).url;

export const getEpisodeFilename = (episode: Episode) => {
  const extension = getExtensionFromUrl(getEpisodeRemoteUrl(episode), ".mp3");
  return `${episode.title}.${episode.guid}${extension}`;
};

export const getEpisodeDownloadPath = (podcast: Podcast, episode: Episode) =>
  path.join(getPodcastDownloadDirectory(podcast), getEpisodeFilename(episode));
