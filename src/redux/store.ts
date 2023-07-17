import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import workspaceReducer from './slices/WorkspaceSlice';
import conditionsReducer from './slices/ConditonsSlice';
import WorkspaceDataReducer from './slices/WorkspaceDataSlice';

const rootReducer = combineReducers({
  workspaceState: workspaceReducer,
  workspaceData: WorkspaceDataReducer,
  conditionsState: conditionsReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
export default store;

// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
