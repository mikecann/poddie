import { GLSDefaults } from "gls/lib";
import React from "react";
import ReactDOM from "react-dom";
import { queryCache, ReactQueryCacheProvider } from "react-query";
import { App } from "./App";
import {
  startPersistingQueryCache,
  depersistQueryCache,
} from "./utils/persistance/queryCachePersistance";
import { listenForMainLogs } from "./utils/logging";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

const bootstrap = () => {
  depersistQueryCache();
  startPersistingQueryCache();
  listenForMainLogs();

  ReactDOM.render(
    <Provider store={store}>
      <GLSDefaults.Provider value={{ verticalSpacing: 0, horizontalSpacing: 0 }}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </ReactQueryCacheProvider>
      </GLSDefaults.Provider>
    </Provider>,
    document.getElementById("root")
  );
};

bootstrap();
