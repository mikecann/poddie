import { Item } from "rss-parser";
import * as fs from "fs";
import { remote } from "electron";
import * as path from "path";
import * as got from "got";
import { ensure } from "../utils/ensure";
import { Podcast } from "../features/podcasts";
//import { electron } from "../index";

// const { remote, app } = electron;
//const fs: typeof import("fs") = electron.remote.require("fs");

const downloadDir = path.join(remote.app.getPath("userData"), "/downloads");

export const downloadEpisode = (podcast: Podcast, episode: Item) => {
  const remoteUrl = ensure(episode.enclosure).url;
  //const localDownloadUrl = path.join(downloadDir, ensure(episode.enclosure).url;

  console.log(`Downloading.. `, { episode, remoteUrl });

  //const cachePath = app.getPath("appData");
  //console.log("downloadEpisode -> cachePath", cachePath);
};
