import { GLSDefaults } from "gls/lib";
import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom";
import { queryCache, ReactQueryCacheProvider } from "react-query";
import { App } from "./App";
import { addedPodcastsAtom } from "./features/podcasts";
import {Persistor} from './persistance/Persistor';
import "./index.css";

const bootstrap = () => {
  ReactDOM.render(
    <Provider>
      <Persistor />
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
