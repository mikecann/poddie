import * as React from "react";
import { Story } from "@storybook/react";
import { omit } from "../misc";

type Options<TComponent extends React.ComponentType> = {
  component: TComponent;
  args?: Partial<React.ComponentProps<TComponent>>;
} & Omit<Story<React.ComponentProps<TComponent>>, "args">;

export const createStory = <TComponent extends React.JSXElementConstructor<any>>(
  options: Options<TComponent>
): Story<React.ComponentProps<TComponent>> => {
  const Component = options.component;
  const Template: Story<React.ComponentProps<TComponent>> = (args) => <Component {...args} />;
  for (let key in omit(options, "component")) (Template as any)[key] = (options as any)[key];
  return Template;
};
