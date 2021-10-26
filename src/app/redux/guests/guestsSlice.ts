/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import TrackerApi, { Guest, GuestQueryParams } from 'app/api';

import { StatusType } from '../statusType';

export interface GuestsState {
  status: StatusType,
  list: Guest[],
  errorMessage?: string;
}

export const fetchGuests = createAsyncThunk('guests/fetchGuests', async (params?: GuestQueryParams) => {
  const result = await TrackerApi
    .getInstance()
    .fetchGuests(params);

  return result;
})

export const guestsSlice = createSlice({
  name: 'guests',
  initialState: <GuestsState>{
    status: 'idle',
    list: []
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGuests.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.list = action.payload;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.status = 'failed'
        state.errorMessage = action.error.message;
      })
  }
})

// Action creators are generated for each case reducer function
// export const { action } = charactersSlice.actions;

export const selectAllGuests = (state: { guests: GuestsState }) => state.guests.list;

export default guestsSlice.reducer;
