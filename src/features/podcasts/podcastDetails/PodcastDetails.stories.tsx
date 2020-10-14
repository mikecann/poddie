import * as React from "react";
import { createMeta } from "../../../utils/storybook/createMeta";
import { createStory } from "../../../utils/storybook/createStory";
import { exampleSavedPodcasts } from "../../../utils/testing/fixtures/podcasts";
import { PodcastDetails } from "./PodcastDetails";
import { exampleEpisodes } from "../../../utils/testing/fixtures/episodes";

export default createMeta({
  component: PodcastDetails,
  title: `Podcasts/PodcastDetails`,
  args: {
    podcast: exampleSavedPodcasts[0],
    isLoading: false,
    episodes: [],
    selectedEpisode: null,
  },
});

export const Default = createStory({
  storyName: `default`,
  component: PodcastDetails,
});

export const SomeEpisodes = createStory({
  storyName: `some episodes`,
  component: PodcastDetails,
  args: {
    episodes: exampleEpisodes,
  },
});

export const SomeEpisodesOneSelected = createStory({
  storyName: `some episodes, one selected`,
  component: PodcastDetails,
  args: {
    episodes: exampleEpisodes,
    selectedEpisode: exampleEpisodes[4],
  },
});
