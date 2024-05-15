import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import urlReducer from "./Slice/RouterBack";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};

const UrlReducer = persistReducer(persistConfig, urlReducer);

const store = configureStore({
  reducer: {
    url: UrlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
