import { GLSDefaults } from "gls/lib";
import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom";
import { queryCache, ReactQueryCacheProvider } from "react-query";
import { App } from "./App";
import { addedPodcastsAtom } from "./features/podcasts";
import { AtomPersistor } from "./persistance/AtomPersistor";
import {
  startPersistingQueryCache,
  depersistQueryCache,
} from "./persistance/queryCachePersistance";
import { downloadEpisode } from "./downloading/downloadEpisode";
import "./index.css";

const bootstrap = () => {
  

  depersistQueryCache();
  startPersistingQueryCache();

  ReactDOM.render(
    <Provider>
      <AtomPersistor atom={addedPodcastsAtom} storageKey={"savedPodcasts"} />
      <GLSDefaults.Provider
        value={{ verticalSpacing: 0, horizontalSpacing: 0 }}
      >
        <ReactQueryCacheProvider queryCache={queryCache}>
          <App />
        </ReactQueryCacheProvider>
      </GLSDefaults.Provider>
    </Provider>,
    document.getElementById("root")
  );
};

bootstrap();
