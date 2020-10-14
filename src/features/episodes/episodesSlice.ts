import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { PodcastId } from "../podcasts/podcastsSlice";
import { ensure } from "../../utils/misc";
import { Item } from "rss-parser";
import { downloadEpisodeFromIPC } from "./downloadEpisodeFromIPC";
import { RootState } from "../../app/rootReducer";

export type EpisodeId = string;

export type Episode = {
  id: EpisodeId;
  podcastId: PodcastId;
  feedInfo: Item;
  downloadState: DownloadState;
};

export type DownloadState =
  | { status: "unknown" }
  | { status: "downloading"; progressPercent: number }
  | { status: "downloaded"; localPath: string }
  | { status: "error"; error: string };

interface State {
  episodes: Record<EpisodeId, Episode>;
}

const initialState: State = {
  episodes: {},
};

const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    addEpisodes(state, action: PayloadAction<Episode[]>) {
      for (let episode of action.payload) state.episodes[episode.id] = episode;
    },
    downloadStarted(state, action: PayloadAction<EpisodeId>) {
      const episode = ensure(state.episodes[action.payload]);
      episode.downloadState = {
        progressPercent: 0,
        status: "downloading",
      };
    },
    downloadProgressed(state, action: PayloadAction<{ id: EpisodeId; progress: number }>) {
      state.episodes[action.payload.id].downloadState = {
        progressPercent: action.payload.progress,
        status: "downloading",
      };
    },
    downloadSuccess(state, action: PayloadAction<{ id: EpisodeId; localPath: string }>) {
      state.episodes[action.payload.id].downloadState = {
        status: "downloaded",
        localPath: action.payload.localPath,
      };
    },
    downloadError(state, action: PayloadAction<{ id: EpisodeId; error: string }>) {
      state.episodes[action.payload.id].downloadState = {
        status: "error",
        error: action.payload.error,
      };
    },
  },
});

export const {
  addEpisodes,
  downloadStarted,
  downloadError,
  downloadProgressed,
  downloadSuccess,
} = slice.actions;

export const episodesReducer = slice.reducer;

export const downloadEpisode = (episode: Episode): AppThunk => (dispatch, getState) => {
  const podcast = ensure(getState().podcasts.savedPodcasts[episode.podcastId]);

  dispatch(downloadStarted(episode.id));

  downloadEpisodeFromIPC(podcast.itunesInfo, episode, (progress) =>
    dispatch(downloadProgressed({ id: episode.id, progress }))
  )
    .then((localPath) => dispatch(downloadSuccess({ id: episode.id, localPath })))
    .catch((error) => dispatch(downloadError({ id: episode.id, error: error + "" })));
};

export const selectEpisodesForPodcast = (podcastId: PodcastId) => ({ episodes }: RootState) =>
  Object.values(episodes.episodes).filter((e) => e.podcastId == podcastId);
