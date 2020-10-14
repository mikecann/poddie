import { GLSDefaults } from "gls/lib";
import React from "react";
import ReactDOM from "react-dom";
import { queryCache, ReactQueryCacheProvider } from "react-query";
import { App } from "./app/App";
import {
  startPersistingQueryCache,
  depersistQueryCache,
} from "./utils/persistance/queryCachePersistance";
import { listenForMainLogs } from "./utils/logging";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { PoddieGlsDefaults } from "./components/style/PoddieGlsDefaults";

const bootstrap = () => {
  depersistQueryCache();
  startPersistingQueryCache();
  listenForMainLogs();

  ReactDOM.render(
    <Provider store={store}>
      <PoddieGlsDefaults>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </ReactQueryCacheProvider>
      </PoddieGlsDefaults>
    </Provider>,
    document.getElementById("root")
  );
};

bootstrap();
