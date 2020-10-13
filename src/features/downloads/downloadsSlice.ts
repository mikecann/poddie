import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { generateId } from "../../utils/generateId";
import { Episode, Podcast } from "../podcasts/podcastsSlice";
import { DownloadId, DownloadState } from "./types";
import { getEpisodeIdFromEpisode, getPodcastIdFromPodcast } from "../podcasts/podcasts";
import { downloadEpisodeFromIPC } from "./downloadEpisodeFromIPC";

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
      action: PayloadAction<{ id: string; episodeId: string; podcastId: number }>
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

    downloadProgressed(state, action: PayloadAction<{ id: string; progress: number }>) {
      state.downloads[action.payload.id].progressPercent = action.payload.progress;
    },

    downloadSuccess(state, action: PayloadAction<{ id: string }>) {
      state.downloads[action.payload.id].status = "success";
    },

    downloadError(state, action: PayloadAction<{ id: string; error: string }>) {
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

export const downloadEpisode = (podcast: Podcast, episode: Episode): AppThunk => (dispatch) => {
  const id = generateId();
  const episodeId = getEpisodeIdFromEpisode(episode);
  const podcastId = getPodcastIdFromPodcast(podcast);

  dispatch(downloadStarted({ episodeId, podcastId, id }));

  downloadEpisodeFromIPC(podcast, episode, id, (progress) =>
    dispatch(downloadProgressed({ id, progress }))
  )
    .then(() => dispatch(downloadSuccess({ id })))
    .catch((error) => dispatch(downloadError({ id, error: error + "" })));
};
