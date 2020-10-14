import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPodcastIdFromPodcastSearchItem, podcastRssFeedItemsToEpisodes } from "./podcasts";
import { RootState } from "../../app/rootReducer";
import { PodcastITunesInfo } from "../../api/itunes/types";
import { AppThunk } from "../../app/store";
import { ensure } from "../../utils/misc";
import { downloadEpisodeFromIPC } from "../episodes/downloadEpisodeFromIPC";
import { loadPodcastFeed } from "../../api/rss/podcasts";
import { addEpisodes } from "../episodes/episodesSlice";

export type PodcastId = string;

export type SavedPodcast = {
  id: PodcastId;
  itunesInfo: PodcastITunesInfo;
  episodesLoadState: EpisodesLoadState;
};

export interface EpisodesLoadState {
  status: "not-loaded" | "loaded" | "loading" | "errored";
  lastLoadAt: number;
  error?: string;
}

interface State {
  savedPodcasts: Record<PodcastId, SavedPodcast>;
  selectedPodcastId: PodcastId | null;
}

const initialState: State = {
  savedPodcasts: {},
  selectedPodcastId: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addSavedPodcast(state, { payload }: PayloadAction<PodcastITunesInfo>) {
      const id = getPodcastIdFromPodcastSearchItem(payload);
      state.savedPodcasts[id] = {
        id,
        itunesInfo: payload,
        episodesLoadState: { lastLoadAt: 0, status: "not-loaded" },
      };
    },
    removeSavedPodcast(state, { payload }: PayloadAction<PodcastId>) {
      delete state.savedPodcasts[payload];
    },
    selectPodcast(state, action: PayloadAction<PodcastId | null>) {
      state.selectedPodcastId = action.payload;
    },
    episodesLoadingStarted(state, action: PayloadAction<PodcastId>) {
      const podcast = ensure(state.savedPodcasts[action.payload]);
      podcast.episodesLoadState.status = "loading";
    },
    episodesLoadingSuccess(state, action: PayloadAction<PodcastId>) {
      const podcast = ensure(state.savedPodcasts[action.payload]);
      podcast.episodesLoadState.status = "loaded";
      podcast.episodesLoadState.lastLoadAt = Date.now();
    },
    episodesLoadingError(state, action: PayloadAction<{ podcastId: string; error: string }>) {
      const podcast = ensure(state.savedPodcasts[action.payload.podcastId]);
      podcast.episodesLoadState.status = "errored";
      podcast.episodesLoadState.error = action.payload.error;
    },
  },
});

export const {
  addSavedPodcast,
  removeSavedPodcast,
  selectPodcast,
  episodesLoadingError,
  episodesLoadingStarted,
  episodesLoadingSuccess,
} = slice.actions;

export const podcastsReducer = slice.reducer;

export const selectSelectedPodcast = ({ podcasts }: RootState): SavedPodcast | null =>
  podcasts.selectedPodcastId ? podcasts.savedPodcasts[podcasts.selectedPodcastId] : null;

export const loadEpisodes = (podcast: SavedPodcast): AppThunk => (dispatch, getState) => {
  if (podcast.episodesLoadState.status == "loading") {
    console.log(`Podcast already loading, not loading again`, podcast);
    return;
  }

  if (
    podcast.episodesLoadState.status == "loaded" &&
    podcast.episodesLoadState.lastLoadAt - Date.now() < 120000
  ) {
    console.log(`Too soon to load podcast again`, podcast);
    return;
  }

  dispatch(episodesLoadingStarted(podcast.id));

  loadPodcastFeed(podcast.itunesInfo.feedUrl)
    .then((output) => {
      dispatch(episodesLoadingSuccess(podcast.id));
      dispatch(addEpisodes(podcastRssFeedItemsToEpisodes(podcast.id, output.items ?? [])));
    })
    .catch((err) => dispatch(episodesLoadingError({ error: err + "", podcastId: podcast.id })));
};
