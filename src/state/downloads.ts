import { createEffect, createEvent, createStore } from "effector";
import { Episode, Podcast, hasEpisodeBeenDownloaded } from "../features/podcasts";
import { Modals } from "./app";
import { generateId } from "../utils/generateId";

/**
 * Types
 */

export type DownloadId = string;

export interface DownloadState {
  id: DownloadId;
  podcastId: string;
  episodeId: string;
  progressPercent: number;
  status: "downloading" | "success" | "error";
  error?: string;
}

export interface DownloadsStoreState {
  downloads: Record<DownloadId, DownloadState>;
}

/**
 * Events
 */

export const downloadStarted = createEvent<DownloadState>();
export const downloadSucceeded = createEvent<DownloadId>();
export const downloadErrored = createEvent<DownloadId>();
export const downloadProgressed = createEvent<DownloadId>();

/**
 * Effects
 */

export const downloadEpisodeEffect = createEffect(async (podcast: Podcast, episode: Episode) => {
  if (hasEpisodeBeenDownloaded(podcast, episode)) return;

  const id = generateId();
});

/**
 * State
 */

const defaultDownloadStoreState: DownloadsStoreState = {
  downloads: {},
};

export const downloadsStore = createStore<DownloadsStoreState>(defaultDownloadStoreState);
