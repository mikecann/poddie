import * as React from "react";
import { createMeta } from "../../../utils/storybook/createMeta";
import { createStory } from "../../../utils/storybook/createStory";
import { examplePodcastItunesInfo } from "../../../utils/testing/fixtures/podcasts";
import { SavePodcastModal } from "./SavePodcastModal";

export default createMeta({
  component: SavePodcastModal,
  title: `Podcasts/SavePodcastModal`,
  args: {
    searchResults: [],
    visible: false,
    selectedItem: null,
  },
});

export const Closed = createStory({
  storyName: `closed`,
  component: SavePodcastModal,
});

export const Open = createStory({
  storyName: `open`,
  component: SavePodcastModal,
  args: {
    visible: true,
  },
});

export const WithSomeItems = createStory({
  storyName: `with some items`,
  component: SavePodcastModal,
  args: {
    visible: true,
    searchResults: examplePodcastItunesInfo,
  },
});

export const WithSomeItemsAndOneSelected = createStory({
  storyName: `with some items and one selected`,
  component: SavePodcastModal,
  args: {
    visible: true,
    searchResults: examplePodcastItunesInfo,
    selectedItem: examplePodcastItunesInfo[1],
  },
});

export const Loading = createStory({
  storyName: `loading`,
  component: SavePodcastModal,
  args: {
    visible: true,
    isLoading: true,
    searchResults: examplePodcastItunesInfo,
    selectedItem: examplePodcastItunesInfo[1],
  },
});

export const Errored = createStory({
  storyName: `errored`,
  component: SavePodcastModal,
  args: {
    visible: true,
    error: "whoopsie!",
    searchResults: examplePodcastItunesInfo,
    selectedItem: examplePodcastItunesInfo[1],
  },
});
