import * as React from "react";
import { createMeta } from "../../utils/storybook/createMeta";
import { createStory } from "../../utils/storybook/createStory";
import { Sidebar } from "./Sidebar";
import { exampleSavedPodcasts } from "../../utils/testing/fixtures/podcasts";

export default createMeta({
  component: Sidebar,
  title: `sidebar/Sidebar`,
  args: {
    savedPodcasts: [],
    selectedPodcastId: null,
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
});

export const Default = createStory({
  storyName: `default`,
  component: Sidebar,
});

export const WithPodcasts = createStory({
  storyName: `with podcasts`,
  component: Sidebar,
  args: {
    savedPodcasts: exampleSavedPodcasts,
  },
});

export const WithPodcastsAndOneSelected = createStory({
  storyName: `with podcasts and one selected`,
  component: Sidebar,
  args: {
    savedPodcasts: exampleSavedPodcasts,
    selectedPodcastId: exampleSavedPodcasts[1].id,
  },
});
