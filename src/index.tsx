import { GLSDefaults } from "gls/lib";
import React from "react";
import ReactDOM from "react-dom";
import { queryCache, ReactQueryCacheProvider } from "react-query";
import { App } from "./App";
import { AppContext } from "./features/app";
import "./index.css";

ReactDOM.render(
  <GLSDefaults.Provider value={{ verticalSpacing: 0, horizontalSpacing: 0 }}>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <AppContext.Provider value={{}}>
        <App />
      </AppContext.Provider>
    </ReactQueryCacheProvider>
  </GLSDefaults.Provider>,
  document.getElementById("root")
);
