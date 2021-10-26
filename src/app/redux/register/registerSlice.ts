/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import TrackerApi, { Guest } from 'app/api';

import { StatusType } from '../statusType';

export interface RegisterState {
  status: StatusType,
  guest?: Guest,
  errorMessage?: string;
}

export const fetchCharacters = createAsyncThunk('register/guest', async () => {
  const result = await TrackerApi
    .getInstance()
    .register();

  return result;
})

export const registerSlice = createSlice({
  name: 'register',
  initialState: <RegisterState>{
    status: 'idle'
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCharacters.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.guest = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed'
        state.errorMessage = action.error.message;
      })
  }
})

// Action creators are generated for each case reducer function
// export const { action } = charactersSlice.actions;

export default registerSlice.reducer;
