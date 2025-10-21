import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TNewOrderData } from '../../clients/burger-api';
import { orderBurgerApi } from '../../clients/burger-api';
import type { TOrder } from '../../utils/types';

export type TBurgerOrderState = {
  order: TOrder | null;
  orderRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  orderError: string | null;
};

export const burgerOrderInitialState: TBurgerOrderState = {
  order: null,
  orderRequestStatus: 'idle',
  orderError: null
};

export const createBurgerOrder = createAsyncThunk(
  'burgerOrder/createBurgerOrder',
  async (newOrderData: TNewOrderData, { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(newOrderData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при создании заказа'
      );
    }
  }
);

export const burgerOrderSlice = createSlice({
  name: 'burgerOrder',
  initialState: burgerOrderInitialState,
  reducers: {
    clearBurgerOrderStatus(state) {
      state.order = null;
      state.orderRequestStatus = 'idle';
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBurgerOrder.pending, (state) => {
        state.order = null;
        state.orderRequestStatus = 'pending';
        state.orderError = null;
      })
      .addCase(createBurgerOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orderRequestStatus = 'succeeded';
        state.orderError = null;
      })
      .addCase(createBurgerOrder.rejected, (state, action) => {
        state.order = null;
        state.orderRequestStatus = 'failed';
        state.orderError = action.payload as string;
      });
  }
});

export const selectBurgerOrder = (state: { burgerOrder: TBurgerOrderState }) =>
  state.burgerOrder.order;

export const selectBurgerOrderError = (state: {
  burgerOrder: TBurgerOrderState;
}) => state.burgerOrder.orderError;

export const selectBurgerOrderRequestStatus = (state: {
  burgerOrder: TBurgerOrderState;
}) => state.burgerOrder.orderRequestStatus;

export const { clearBurgerOrderStatus } = burgerOrderSlice.actions;
