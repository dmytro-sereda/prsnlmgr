import { configureStore } from "@reduxjs/toolkit";
import helpersReducer from "./helpers/helpers.reducer";
import userReducer from "./user/user.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    helpers: helpersReducer,
  },
  devTools: (process.env.NODE_ENV as string) === "production" ? false : true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
