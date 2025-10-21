import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../clients/burger-api';
import type { TOrder } from '../../utils/types';

export type TProfileOrdersState = {
  orders: TOrder[];
  requestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  requestError: string | null;
};

export const profileOrdersInitialState: TProfileOrdersState = {
  orders: [],
  requestStatus: 'idle',
  requestError: null
};

export const getProfileOrders = createAsyncThunk(
  'profileOrders/getProfileOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при получении списка заказов пользователя'
      );
    }
  }
);

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState: profileOrdersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.pending, (state) => {
        state.orders = [];
        state.requestStatus = 'pending';
        state.requestError = null;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.requestStatus = 'succeeded';
        state.requestError = null;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.orders = [];
        state.requestStatus = 'failed';
        state.requestError = action.payload as string;
      });
  }
});

export const selectProfileOrders = (state: {
  profileOrders: TProfileOrdersState;
}) => state.profileOrders.orders;

export const selectProfileOrdersRequestError = (state: {
  profileOrders: TProfileOrdersState;
}) => state.profileOrders.requestError;

export const selectProfileOrdersRequestStatus = (state: {
  profileOrders: TProfileOrdersState;
}) => state.profileOrders.requestStatus;
