import * as React from "react";
import { GLSDefaults } from "gls/lib";
import { Provider } from "react-redux";

interface Props {}

export const PoddieGlsDefaults: React.FC<Props> = ({ children }) => {
  return (
    <GLSDefaults.Provider value={{ verticalSpacing: 0, horizontalSpacing: 0 }}>
      {children}
    </GLSDefaults.Provider>
  );
};
