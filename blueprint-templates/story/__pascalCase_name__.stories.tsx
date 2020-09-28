import * as React from "react";

export default createMeta({
  component: {{pascalCase name}},
  title: `XXX/{{pascalCase name}}`,
  args: {   
  },
});

export const Default = createStory({
  storyName: `default`,
  component: {{pascalCase name}},
});

export const SomethingElse = createStory({
  storyName: `something_else`,
  component: {{pascalCase name}},
  args: {
  },
});
