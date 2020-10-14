import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import path from "path";
import { app } from "electron";

import { ensure } from "./misc";
import { PodcastITunesInfo } from "../api/itunes/types";
import { Episode } from "../features/episodes/episodesSlice";

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

export const getPodcastDownloadDirectory = (podcast: PodcastITunesInfo) =>
  path.join(getDownloadsDirectory(), podcast.collectionName || "misc");

export const getEpisodeRemoteUrl = (episode: Episode) => ensure(episode.feedInfo.enclosure).url;

export const getEpisodeFilename = (episode: Episode) => {
  const extension = getExtensionFromUrl(getEpisodeRemoteUrl(episode), ".mp3");
  return `${episode.feedInfo.title}.${episode.id}${extension}`;
};

export const getEpisodeDownloadPath = (podcast: PodcastITunesInfo, episode: Episode) =>
  path.join(getPodcastDownloadDirectory(podcast), getEpisodeFilename(episode));
