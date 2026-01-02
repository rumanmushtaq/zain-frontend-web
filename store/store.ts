// src/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage" // localStorage

// import your slices
import authReducer from "./slices/auth"
import packagesReducer from "./slices/package"
import tasksReducer from "./slices/tasks"
/* ---------------------------------------------
   Root Reducer
--------------------------------------------- */
const rootReducer = combineReducers({
  auth: authReducer,
  packages : packagesReducer,
  tasks : tasksReducer
//   user: userReducer,
})

/* ---------------------------------------------
   Persist Config
--------------------------------------------- */
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"], // only persist auth (recommended)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

/* ---------------------------------------------
   Store
--------------------------------------------- */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
})

/* ---------------------------------------------
   Persistor
--------------------------------------------- */
export const persistor = persistStore(store)

/* ---------------------------------------------
   Types
--------------------------------------------- */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
