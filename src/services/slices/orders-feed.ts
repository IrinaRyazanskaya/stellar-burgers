import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { burgerAPIClient } from "../../clients/burger-api";
import type { Order } from "../../utils/types";

type OrdersFeedState = {
  orders: Order[];
  stats: {
    total: number;
    totalToday: number;
  };
  error: string | null;
  status: "idle" | "pending" | "succeeded" | "failed";
};

const ordersFeedInitialState: OrdersFeedState = {
  orders: [],
  stats: {
    total: 0,
    totalToday: 0,
  },
  error: null,
  status: "idle",
};

const getOrdersFeed = createAsyncThunk(
  "ordersFeed/getOrdersFeed",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await burgerAPIClient.getFeeds();
      return orders;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Произошла ошибка при получении списка заказов",
      );
    }
  },
);

const ordersFeedSlice = createSlice({
  name: "ordersFeed",
  initialState: ordersFeedInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersFeed.pending, (state) => {
        state.orders = [];
        state.stats = { total: 0, totalToday: 0 };
        state.status = "pending";
        state.error = null;
      })
      .addCase(getOrdersFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.stats = {
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        };
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getOrdersFeed.rejected, (state, action) => {
        state.orders = [];
        state.stats = { total: 0, totalToday: 0 };
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

const selectOrdersFeed = (state: { ordersFeed: OrdersFeedState }) => {
  return state.ordersFeed.orders;
};

const selectOrdersStats = (state: { ordersFeed: OrdersFeedState }) => {
  return state.ordersFeed.stats;
};

const selectOrdersFeedError = (state: { ordersFeed: OrdersFeedState }) => {
  return state.ordersFeed.error;
};

const selectOrdersFeedStatus = (state: { ordersFeed: OrdersFeedState }) => {
  return state.ordersFeed.status;
};

export {
  // State
  ordersFeedSlice,
  ordersFeedInitialState,
  // Actions
  getOrdersFeed,
  // Selectors
  selectOrdersFeed,
  selectOrdersStats,
  selectOrdersFeedError,
  selectOrdersFeedStatus,
};

export type { OrdersFeedState };
