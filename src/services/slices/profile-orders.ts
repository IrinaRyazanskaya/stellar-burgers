import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import { burgerAPIClient } from "../../clients/burger-api";
import type { Order } from "../../utils/types";
import type { RootState } from "../store";

type ProfileOrdersState = {
  orders: Order[];
  error: string | null;
  status: "idle" | "pending" | "succeeded" | "failed";
};

const profileOrdersInitialState: ProfileOrdersState = {
  orders: [],
  error: null,
  status: "idle",
};

const getProfileOrders = createAsyncThunk(
  "profileOrders/getProfileOrders",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await burgerAPIClient.getOrders();
      return orders;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при получении списка заказов пользователя",
      );
    }
  },
);

const profileOrdersSlice = createSlice({
  name: "profileOrders",
  initialState: profileOrdersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.pending, (state) => {
        state.orders = [];
        state.status = "pending";
        state.error = null;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.orders = [];
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

const selectProfileOrdersState = (state: RootState) => {
  return state.profileOrders;
};

const selectProfileOrders = createSelector(selectProfileOrdersState, (profileOrdersState) => {
  return profileOrdersState.orders;
});

const selectProfileOrdersError = createSelector(selectProfileOrdersState, (profileOrdersState) => {
  return profileOrdersState.error;
});

const selectProfileOrdersStatus = createSelector(selectProfileOrdersState, (profileOrdersState) => {
  return profileOrdersState.status;
});

export {
  // State
  profileOrdersSlice,
  profileOrdersInitialState,
  // Actions
  getProfileOrders,
  // Selectors
  selectProfileOrders,
  selectProfileOrdersError,
  selectProfileOrdersStatus,
};

export type { ProfileOrdersState };
