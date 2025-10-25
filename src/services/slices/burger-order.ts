import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import type { NewOrderData } from "../../clients/burger-api";
import { burgerAPIClient } from "../../clients/burger-api";
import type { Order } from "../../utils/types";
import type { RootState } from "../store";

type BurgerOrderState = {
  order: Order | null;
  orderError: string | null;
  orderStatus: "idle" | "pending" | "succeeded" | "failed";
};

const burgerOrderInitialState: BurgerOrderState = {
  order: null,
  orderError: null,
  orderStatus: "idle",
};

const createBurgerOrder = createAsyncThunk(
  "burgerOrder/createBurgerOrder",
  async (newOrderData: NewOrderData, { rejectWithValue }) => {
    try {
      const data = await burgerAPIClient.orderBurger(newOrderData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Произошла ошибка при создании заказа",
      );
    }
  },
);

const burgerOrderSlice = createSlice({
  name: "burgerOrder",
  initialState: burgerOrderInitialState,
  reducers: {
    clearBurgerOrderStatus(state) {
      state.order = null;
      state.orderStatus = "idle";
      state.orderError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBurgerOrder.pending, (state) => {
        state.order = null;
        state.orderStatus = "pending";
        state.orderError = null;
      })
      .addCase(createBurgerOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orderStatus = "succeeded";
        state.orderError = null;
      })
      .addCase(createBurgerOrder.rejected, (state, action) => {
        state.order = null;
        state.orderStatus = "failed";
        state.orderError = action.payload as string;
      });
  },
});

const { clearBurgerOrderStatus } = burgerOrderSlice.actions;

const selectBurgerOrderState = (state: RootState) => {
  return state.burgerOrder;
};

const selectBurgerOrder = createSelector(
  selectBurgerOrderState,
  (burgerOrderState) => burgerOrderState.order,
);

const selectBurgerOrderError = createSelector(
  selectBurgerOrderState,
  (burgerOrderState) => burgerOrderState.orderError,
);

const selectBurgerOrderStatus = createSelector(
  selectBurgerOrderState,
  (burgerOrderState) => burgerOrderState.orderStatus,
);

export {
  // State
  burgerOrderSlice,
  burgerOrderInitialState,
  // Actions
  createBurgerOrder,
  clearBurgerOrderStatus,
  // Selectors
  selectBurgerOrder,
  selectBurgerOrderError,
  selectBurgerOrderStatus,
};

export type { BurgerOrderState };
