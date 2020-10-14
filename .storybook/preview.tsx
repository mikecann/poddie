import * as React from "react";
import { PoddieGlsDefaults } from "../src/components/style/PoddieGlsDefaults";
import { backgroundColor } from "../src/styles";
import "../src/index.css";
import { cssRaw } from "typestyle";

cssRaw(`#root { height: 100% }`);

export const decorators = [
  (Story) => (
    <PoddieGlsDefaults>
      <div
        style={{ backgroundColor: backgroundColor.toHexString(), width: "100%", height: "100%" }}
      >
        <Story />
      </div>
    </PoddieGlsDefaults>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
