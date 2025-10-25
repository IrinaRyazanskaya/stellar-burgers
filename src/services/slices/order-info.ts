import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import { burgerAPIClient } from "../../clients/burger-api";
import type { RootState } from "../store";
import type { Order } from "../../utils/types";

type OrderInfoState = {
  order: Order | null;
  error: string | null;
  status: "idle" | "pending" | "succeeded" | "failed";
};

const orderInfoInitialState: OrderInfoState = {
  order: null,
  error: null,
  status: "idle",
};

const getOrderInfo = createAsyncThunk(
  "orderInfo/getOrderInfo",
  async (number: number, { rejectWithValue }) => {
    try {
      const data = await burgerAPIClient.getOrder(number);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при получении информации о заказе",
      );
    }
  },
);

const orderInfoSlice = createSlice({
  name: "orderInfo",
  initialState: orderInfoInitialState,
  reducers: {
    clearOrderInfo(state) {
      state.order = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfo.pending, (state) => {
        state.order = null;
        state.status = "pending";
        state.error = null;
      })
      .addCase(getOrderInfo.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getOrderInfo.rejected, (state, action) => {
        state.order = null;
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

const { clearOrderInfo } = orderInfoSlice.actions;

const selectOrderInfoState = (state: RootState) => {
  return state.orderInfo;
};

const selectOrderInfo = createSelector(selectOrderInfoState, (orderInfoState) => {
  return orderInfoState.order;
});

const selectOrderInfoError = createSelector(selectOrderInfoState, (orderInfoState) => {
  return orderInfoState.error;
});

const selectOrderInfoStatus = createSelector(selectOrderInfoState, (orderInfoState) => {
  return orderInfoState.status;
});

export {
  // State
  orderInfoSlice,
  orderInfoInitialState,
  // Actions
  getOrderInfo,
  clearOrderInfo,
  // Selectors
  selectOrderInfo,
  selectOrderInfoError,
  selectOrderInfoStatus,
};

export type { OrderInfoState };
