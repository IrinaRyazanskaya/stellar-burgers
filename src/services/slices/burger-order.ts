import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { NewOrderData } from "../../clients/burger-api";
import { burgerAPIClient } from "../../clients/burger-api";
import type { Order } from "../../utils/types";

type BurgerOrderState = {
  order: Order | null;
  orderRequestStatus: "idle" | "pending" | "succeeded" | "failed";
  orderError: string | null;
};

const burgerOrderInitialState: BurgerOrderState = {
  order: null,
  orderError: null,
  orderRequestStatus: "idle",
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
      state.orderRequestStatus = "idle";
      state.orderError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBurgerOrder.pending, (state) => {
        state.order = null;
        state.orderRequestStatus = "pending";
        state.orderError = null;
      })
      .addCase(createBurgerOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orderRequestStatus = "succeeded";
        state.orderError = null;
      })
      .addCase(createBurgerOrder.rejected, (state, action) => {
        state.order = null;
        state.orderRequestStatus = "failed";
        state.orderError = action.payload as string;
      });
  },
});

const { clearBurgerOrderStatus } = burgerOrderSlice.actions;

const selectBurgerOrder = (state: { burgerOrder: BurgerOrderState }) => {
  return state.burgerOrder.order;
};

const selectBurgerOrderError = (state: { burgerOrder: BurgerOrderState }) => {
  return state.burgerOrder.orderError;
};

const selectBurgerOrderRequestStatus = (state: { burgerOrder: BurgerOrderState }) => {
  return state.burgerOrder.orderRequestStatus;
};

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
  selectBurgerOrderRequestStatus,
};

export type { BurgerOrderState };
