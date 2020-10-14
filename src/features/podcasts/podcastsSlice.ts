import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPodcastIdFromPodcastSearchItem } from "./podcasts";
import { Item } from "rss-parser";
import { RootState } from "../../app/rootReducer";

export interface ITunesAPIRequestResponse {
  resultCount: number;
  results: PodcastSearchItem[];
}

export type PodcastSearchItem = {
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

export type SavedPodcast = PodcastSearchItem & {
  id: PodcastId;
};

export type Episode = Item;

export type PodcastId = string;

export type EpisodeId = string;

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
    addSavedPodcast(state, { payload }: PayloadAction<PodcastSearchItem>) {
      const id = getPodcastIdFromPodcastSearchItem(payload);
      state.savedPodcasts[id] = { ...payload, id };
    },
    removeSavedPodcast(state, { payload }: PayloadAction<PodcastId>) {
      delete state.savedPodcasts[payload];
    },
    selectPodcast(state, action: PayloadAction<PodcastId | null>) {
      state.selectedPodcastId = action.payload;
    },
  },
});

export const { addSavedPodcast, removeSavedPodcast, selectPodcast } = slice.actions;

export const podcastsReducer = slice.reducer;

export const selectSelectedPodcast = ({ podcasts }: RootState): SavedPodcast | null =>
  podcasts.savedPodcasts[podcasts.selectedPodcastId];
