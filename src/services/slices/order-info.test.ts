import { configureStore } from "@reduxjs/toolkit";

import { burgerAPIClient } from "../../clients/burger-api";
import type { Order } from "../../utils/types";
import {
  orderInfoSlice,
  getOrderInfo,
  clearOrderInfo,
  orderInfoInitialState,
  OrderInfoState,
} from "./order-info";

jest.mock("../../clients/burger-api");

const mockOrder: Order = {
  _id: "order123",
  number: 123,
  name: "Test Order",
  status: "done",
  ingredients: ["ingredient1", "ingredient2"],
  createdAt: "2024-04-01T12:00:00.000Z",
  updatedAt: "2024-04-01T12:30:00.000Z",
};

describe("orderInfoSlice", () => {
  it("should handle clearOrderInfo", () => {
    const state: OrderInfoState = {
      order: mockOrder,
      status: "succeeded",
      error: "Some Error",
    };

    const nextState = orderInfoSlice.reducer(state, clearOrderInfo());

    expect(nextState).toEqual(orderInfoInitialState);
  });

  it("should handle getOrderInfo pending", () => {
    const action = { type: getOrderInfo.pending.type };

    const nextState = orderInfoSlice.reducer(orderInfoInitialState, action);

    expect(nextState.status).toEqual("pending");
    expect(nextState.order).toBeNull();
    expect(nextState.error).toBeNull();
  });

  it("should handle getOrderInfo fulfilled", async () => {
    (burgerAPIClient.getOrder as jest.Mock).mockResolvedValue({
      orders: [mockOrder],
    });

    const store = configureStore({ reducer: orderInfoSlice.reducer });

    await store.dispatch(getOrderInfo(123));

    const state = store.getState();

    expect(state.status).toEqual("succeeded");
    expect(state.order).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it("should handle getOrderInfo rejected", async () => {
    (burgerAPIClient.getOrder as jest.Mock).mockRejectedValue(new Error("API Error"));

    const store = configureStore({ reducer: orderInfoSlice.reducer });

    await store.dispatch(getOrderInfo(123));

    const state = store.getState();

    expect(state.status).toEqual("failed");
    expect(state.order).toBeNull();
    expect(state.error).toEqual("API Error");
  });
});
