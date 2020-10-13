import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPodcastIdFromPodcast } from "./podcasts";
import { Item } from "rss-parser";
import { RootState } from "../../app/rootReducer";

export interface ITunesAPIRequestResponse {
  resultCount: number;
  results: Podcast[];
}

export type Podcast = {
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

export type Episode = Item;

export type PodcastId = number;

export type EppisodeId = string;

interface State {
  savedPodcasts: Podcast[];
  selectedPodcastId: PodcastId | null;
}

const initialState: State = {
  savedPodcasts: [],
  selectedPodcastId: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addSavedPodcast(state, action: PayloadAction<Podcast>) {
      state.savedPodcasts.push(action.payload);
    },
    removeSavedPodcast(state, action: PayloadAction<PodcastId>) {
      state.savedPodcasts = state.savedPodcasts.filter(
        (p) => getPodcastIdFromPodcast(p) != action.payload
      );
    },
    selectPodcast(state, action: PayloadAction<PodcastId | null>) {
      state.selectedPodcastId = action.payload;
    },
  },
});

export const { addSavedPodcast, removeSavedPodcast, selectPodcast } = slice.actions;

export const podcastsReducer = slice.reducer;

export const selectSelectedPodcast = ({ podcasts }: RootState): Podcast | null =>
  podcasts.savedPodcasts.find((p) => p.collectionId == podcasts.selectedPodcastId);
