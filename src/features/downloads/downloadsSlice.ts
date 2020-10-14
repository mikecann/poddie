import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { generateId } from "../../utils/generateId";
import {
  Episode,
  EpisodeId,
  PodcastId,
  PodcastSearchItem,
  SavedPodcast,
} from "../podcasts/podcastsSlice";
import { getEpisodeIdFromEpisode, getPodcastIdFromPodcastSearchItem } from "../podcasts/podcasts";
import { downloadEpisodeFromIPC } from "./downloadEpisodeFromIPC";

export type DownloadId = string;

export interface DownloadState {
  id: DownloadId;
  podcastId: PodcastId;
  episodeId: EpisodeId;
  progressPercent: number;
  status: "downloading" | "success" | "error";
  error?: string;
}

interface State {
  downloads: Record<DownloadId, DownloadState>;
}

const initialState: State = {
  downloads: {},
};

const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    downloadStarted(
      state,
      action: PayloadAction<{ id: DownloadId; episodeId: EpisodeId; podcastId: PodcastId }>
    ) {
      const { episodeId, id, podcastId } = action.payload;
      state.downloads[id] = {
        id,
        episodeId,
        podcastId,
        progressPercent: 0,
        status: "downloading",
      };
    },

    downloadProgressed(state, action: PayloadAction<{ id: DownloadId; progress: number }>) {
      state.downloads[action.payload.id].progressPercent = action.payload.progress;
    },

    downloadSuccess(state, action: PayloadAction<{ id: DownloadId }>) {
      state.downloads[action.payload.id].status = "success";
    },

    downloadError(state, action: PayloadAction<{ id: DownloadId; error: string }>) {
      state.downloads[action.payload.id].status = "error";
      state.downloads[action.payload.id].error = action.payload.error;
    },
  },
});

export const {
  downloadStarted,
  downloadError,
  downloadProgressed,
  downloadSuccess,
} = slice.actions;

export const downloadsReducer = slice.reducer;

export const downloadEpisode = (podcast: SavedPodcast, episode: Episode): AppThunk => (
  dispatch
) => {
  const id = generateId();
  const episodeId = getEpisodeIdFromEpisode(episode);
  const podcastId = podcast.id;

  dispatch(downloadStarted({ episodeId, podcastId, id }));

  downloadEpisodeFromIPC(podcast, episode, id, (progress) =>
    dispatch(downloadProgressed({ id, progress }))
  )
    .then(() => dispatch(downloadSuccess({ id })))
    .catch((error) => dispatch(downloadError({ id, error: error + "" })));
};
