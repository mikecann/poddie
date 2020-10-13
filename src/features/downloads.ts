import { remote } from "electron";
import * as path from "path";
import { Episode, hasEpisodeBeenDownloaded, Podcast } from "./podcasts";

//import { electron } from "../index";

const { app } = remote;
//const fs: typeof import("fs") = electron.remote.require("fs");

const downloadDir = path.join(app.getPath("userData"), "/downloads");
console.log("downloadDir", downloadDir);

export const downloadEpisode = async (podcast: Podcast, episode: Episode) => {
  // const remoteUrl = ensure(episode.enclosure).url;
  // const localDownloadUrl = path.join(downloadDir, episode.title + "." + episode.guid + ".mp3");

  if (hasEpisodeBeenDownloaded(podcast, episode)) return;

  //sendMessageToMain("download-episode", { episode, podcast });
};
