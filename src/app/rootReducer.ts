import { combineReducers } from "@reduxjs/toolkit";
import { podcastsReducer } from "../features/podcasts/podcastsSlice";
import { modalsReducer } from "../features/modals/modalsSlice";
import { downloadsReducer } from "../features/downloads/downloadsSlice";

export const rootReducer = combineReducers({
  downloads: downloadsReducer,
  modals: modalsReducer,
  podcasts: podcastsReducer,
});

export interface RootState extends ReturnType<typeof rootReducer> {}
