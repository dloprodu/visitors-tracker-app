/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import TrackerApi, { Guest, GuestQueryParams, PagedResponse } from 'app/api';

import buildChart, { ChartItemType } from './chart-utils';

import { StatusType } from '../statusType';

export interface GuestsState {
  isFirstLoad: boolean,
  status: StatusType,
  list: PagedResponse<Guest>,
  errorMessage?: string;
  charts: {
    platforms: ChartItemType[]
    browsers: ChartItemType[]
  }
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
    isFirstLoad: true,
    status: 'idle',
    list: { total: 0, result: [] },
    charts: {
      platforms: [],
      browsers: [],
    }
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGuests.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.list = action.payload;
        state.isFirstLoad = false;

        state.charts.browsers = buildChart(action.payload.result, 'userAgent');
        state.charts.platforms = buildChart(action.payload.result, 'platform');
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.error.message;
        state.isFirstLoad = false;
      })
  }
})

// Action creators are generated for each case reducer function
// export const { action } = charactersSlice.actions;

export default guestsSlice.reducer;
