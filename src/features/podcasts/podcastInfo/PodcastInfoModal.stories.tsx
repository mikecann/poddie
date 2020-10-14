import * as React from "react";
import { createMeta } from "../../../utils/storybook/createMeta";
import { createStory } from "../../../utils/storybook/createStory";
import { examplePodcastItunesInfo } from "../../../utils/testing/fixtures/podcasts";
import { PodcastInfoModal } from "./PodcastInfoModal";

export default createMeta({
  component: PodcastInfoModal,
  title: `Podcasts/PodcastInfoModal`,
  args: {
    visible: false,
    podcast: examplePodcastItunesInfo[0],
  },
});

export const Closed = createStory({
  storyName: `closed`,
  component: PodcastInfoModal,
});

export const Open = createStory({
  storyName: `open`,
  component: PodcastInfoModal,
  args: {
    visible: true,
  },
});
