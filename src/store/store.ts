import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notificationReducer from "@/store/reducers/notificationReducer";

const rootReducer = combineReducers({
    notification: notificationReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type Store = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
