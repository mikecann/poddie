import { combineReducers } from "@reduxjs/toolkit";
import { podcastsReducer } from "../features/podcasts/podcastsSlice";
import { modalsReducer } from "../features/modals/modalsSlice";
import { episodesReducer } from "../features/episodes/episodesSlice";

export const rootReducer = combineReducers({
  modals: modalsReducer,
  podcasts: podcastsReducer,
  episodes: episodesReducer,
});

export interface RootState extends ReturnType<typeof rootReducer> {}
