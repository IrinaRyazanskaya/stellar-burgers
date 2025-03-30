import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrderByNumberApi } from '@api';
import type { TOrder } from '@utils-types';

type TOrderInfoState = {
  order: TOrder | null;
  orderRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  orderRequestError: string | null;
};

const initialState: TOrderInfoState = {
  order: null,
  orderRequestStatus: 'idle',
  orderRequestError: null
};

export const getOrderInfo = createAsyncThunk(
  'orderInfo/getOrderInfo',
  async (number: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(number);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при получении информации о заказе'
      );
    }
  }
);

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    clearOrderInfo(state) {
      state.order = null;
      state.orderRequestStatus = 'idle';
      state.orderRequestError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfo.pending, (state) => {
        state.order = null;
        state.orderRequestStatus = 'pending';
        state.orderRequestError = null;
      })
      .addCase(getOrderInfo.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.orderRequestStatus = 'succeeded';
        state.orderRequestError = null;
      })
      .addCase(getOrderInfo.rejected, (state, action) => {
        state.order = null;
        state.orderRequestStatus = 'failed';
        state.orderRequestError = action.payload as string;
      });
  }
});

export const selectOrderInfo = (state: { orderInfo: TOrderInfoState }) =>
  state.orderInfo.order;

export const selectOrderInfoRequestError = (state: {
  orderInfo: TOrderInfoState;
}) => state.orderInfo.orderRequestError;

export const selectOrderInfoRequestStatus = (state: {
  orderInfo: TOrderInfoState;
}) => state.orderInfo.orderRequestStatus;

export const { clearOrderInfo } = orderInfoSlice.actions;
