import { GLSDefaults } from "gls/lib";
import React from "react";
import ReactDOM from "react-dom";
import { queryCache, ReactQueryCacheProvider } from "react-query";
import { App } from "./App";
import {
  startPersistingQueryCache,
  depersistQueryCache,
} from "./persistance/queryCachePersistance";
import { listenForMainLogs } from "./utils/logging";
import "./index.css";

const bootstrap = () => {
  depersistQueryCache();
  startPersistingQueryCache();
  listenForMainLogs();

  ReactDOM.render(
    <GLSDefaults.Provider value={{ verticalSpacing: 0, horizontalSpacing: 0 }}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <App />
      </ReactQueryCacheProvider>
    </GLSDefaults.Provider>,
    document.getElementById("root")
  );
};

bootstrap();
