import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi } from '@api';
import type { TOrder } from '@utils-types';

type TOrdersFeedState = {
  orders: TOrder[];
  stats: {
    total: number;
    totalToday: number;
  };
  requestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  requestError: string | null;
};

const initialState: TOrdersFeedState = {
  orders: [],
  stats: {
    total: 0,
    totalToday: 0
  },
  requestStatus: 'idle',
  requestError: null
};

export const getOrdersFeed = createAsyncThunk(
  'ordersFeed/getOrdersFeed',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getFeedsApi();
      return orders;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при получении списка заказов'
      );
    }
  }
);

export const ordersFeedSlice = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersFeed.pending, (state) => {
        state.orders = [];
        state.stats = { total: 0, totalToday: 0 };
        state.requestStatus = 'pending';
        state.requestError = null;
      })
      .addCase(getOrdersFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.stats = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
        state.requestStatus = 'succeeded';
        state.requestError = null;
      })
      .addCase(getOrdersFeed.rejected, (state, action) => {
        state.orders = [];
        state.stats = { total: 0, totalToday: 0 };
        state.requestStatus = 'failed';
        state.requestError = action.payload as string;
      });
  }
});

export const selectOrdersFeed = (state: { ordersFeed: TOrdersFeedState }) =>
  state.ordersFeed.orders;

export const selectOrdersStats = (state: { ordersFeed: TOrdersFeedState }) =>
  state.ordersFeed.stats;

export const selectOrdersFeedRequestError = (state: {
  ordersFeed: TOrdersFeedState;
}) => state.ordersFeed.requestError;

export const selectOrdersFeedRequestStatus = (state: {
  ordersFeed: TOrdersFeedState;
}) => state.ordersFeed.requestStatus;
