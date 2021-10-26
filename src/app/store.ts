import { configureStore } from '@reduxjs/toolkit';

import thunkMiddleware from 'redux-thunk';

import MarvelApi from 'app/api';
import guestsSlice from 'app/redux/guests/guestsSlice';
import registerSlice from 'app/redux/register/registerSlice';

const thunkMiddlewareWithArg = thunkMiddleware.withExtraArgument({ api: MarvelApi.getInstance() })

// This creates a Redux store, and also automatically configure the Redux DevTools extension 
const store = configureStore({
  reducer: {
    guests: guestsSlice,
    register: registerSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddlewareWithArg),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;