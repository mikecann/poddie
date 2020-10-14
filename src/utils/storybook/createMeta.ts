import { Meta } from "@storybook/react";
import * as React from "react";

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

type Options<TComponent extends React.ComponentType, TProps = React.ComponentProps<TComponent>> = {
  title: string;
  component: TComponent;
  args: Omit<TProps, FunctionKeys<TProps>> & Partial<Omit<TProps, NonFunctionKeys<TProps>>>;
} & Omit<Meta<React.ComponentProps<TComponent>>, "args" | "component" | "title">;

export const createMeta = <TComponent extends React.ComponentType<any>>(
  options: Options<TComponent>
): Meta<React.ComponentProps<TComponent>> => ({ ...options } as any);
