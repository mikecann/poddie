import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { rootReducer, RootState } from "./rootReducer";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  useSelector as _useSelector,
  useDispatch as _useDispatch,
  TypedUseSelectorHook,
} from "react-redux";

const reducer = persistReducer(
  {
    key: "AppState",
    storage,
    whitelist: ["podcasts", "episodes"],
  },
  rootReducer
);

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

// if (process.env.NODE_ENV === "development" && module.hot) {
//   module.hot.accept("./rootReducer", () => {
//     const newRootReducer = require("./rootReducer").default;
//     store.replaceReducer(newRootReducer);
//   });
// }

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
export const useDispatch = () => _useDispatch<AppDispatch>();
