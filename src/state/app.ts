import { createEffect, createEvent, createStore } from "effector";
import { Episode, Podcast, hasEpisodeBeenDownloaded } from "../features/podcasts";
import { produce } from "immer";
import withStorage from "effector-storage";

const createStorageStore = withStorage(createStore);

/**
 * Types
 */

export interface Modals {
  addPodcast: {
    isOpen: boolean;
  };
}

export interface AppState {
  savedPodcasts: Podcast[];
  selectedPodcastId: number | null;
}

/**
 * Defaults
 */

export const defaultAppState: AppState = {
  savedPodcasts: [],
  selectedPodcastId: null,
};

export const defaultModalsState: Modals = {
  addPodcast: {
    isOpen: false,
  },
};

/**
 * Events
 */

export const openModal = createEvent<keyof Modals>();
export const closeModal = createEvent<keyof Modals>();
export const setModal = createEvent<keyof Modals>();

export const addSavedPodcast = createEvent<Podcast>();
export const removeSavedPodcast = createEvent<number>();

export const selectPodcast = createEvent<number | null>();

/**
 * Effects
 */

export const downloadEpisodeEffect = createEffect(async (podcast: Podcast, episode: Episode) => {
  if (hasEpisodeBeenDownloaded(podcast, episode)) return;
});

/**
 * Stores
 */

export const modalsStore = createStore<Modals>(defaultModalsState)
  .on(openModal, (state, modal) =>
    produce(state, (draft) => {
      draft[modal].isOpen = true;
    })
  )
  .on(closeModal, (state, modal) =>
    produce(state, (draft) => {
      draft[modal].isOpen = false;
    })
  );

export const appStateStore = createStorageStore(defaultAppState, {
  key: "AppState",
})
  .on(addSavedPodcast, (state, podcast) =>
    produce(state, (draft) => {
      draft.savedPodcasts.push(podcast);
    })
  )
  .on(removeSavedPodcast, (state, podcastCollectionId) =>
    produce(state, (draft) => {
      draft.savedPodcasts = draft.savedPodcasts.filter(
        (p) => p.collectionId != podcastCollectionId
      );
    })
  )
  .on(selectPodcast, (state, podcastCollectionId) =>
    produce(state, (draft) => {
      draft.selectedPodcastId = podcastCollectionId;
    })
  );

export const selectedPodcastStore = appStateStore.map((s) =>
  s.savedPodcasts.find((p) => p.collectionId == s.selectedPodcastId)
);
