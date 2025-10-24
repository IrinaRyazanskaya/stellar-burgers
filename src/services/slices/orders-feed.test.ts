import { configureStore } from "@reduxjs/toolkit";

import { burgerAPIClient } from "../../clients/burger-api";
import type { Order } from "../../utils/types";
import { ordersFeedSlice, getOrdersFeed, ordersFeedInitialState } from "./orders-feed";

jest.mock("../../clients/burger-api");

const mockOrders: Order[] = [
  {
    _id: "1",
    number: 101,
    name: "Order One",
    status: "done",
    ingredients: ["ingredient1", "ingredient2"],
    createdAt: "2024-04-01T10:00:00.000Z",
    updatedAt: "2024-04-01T10:30:00.000Z",
  },
  {
    _id: "2",
    number: 102,
    name: "Order Two",
    status: "pending",
    ingredients: ["ingredient3"],
    createdAt: "2024-04-01T11:00:00.000Z",
    updatedAt: "2024-04-01T11:15:00.000Z",
  },
];

describe("ordersFeedSlice", () => {
  it("should handle getOrdersFeed pending", () => {
    const action = { type: getOrdersFeed.pending.type };

    const nextState = ordersFeedSlice.reducer(ordersFeedInitialState, action);

    expect(nextState.orders).toEqual([]);
    expect(nextState.stats).toEqual({ total: 0, totalToday: 0 });
    expect(nextState.status).toEqual("pending");
    expect(nextState.error).toBeNull();
  });

  it("should handle getOrdersFeed fulfilled", async () => {
    const payload = {
      orders: mockOrders,
      total: 200,
      totalToday: 25,
    };

    (burgerAPIClient.getFeeds as jest.Mock).mockResolvedValue(payload);

    const store = configureStore({ reducer: ordersFeedSlice.reducer });

    await store.dispatch(getOrdersFeed());

    const state = store.getState();

    expect(state.orders).toEqual(mockOrders);
    expect(state.stats).toEqual({ total: 200, totalToday: 25 });
    expect(state.status).toEqual("succeeded");
    expect(state.error).toBeNull();
  });

  it("should handle getOrdersFeed rejected", async () => {
    (burgerAPIClient.getFeeds as jest.Mock).mockRejectedValue(new Error("API Error"));

    const store = configureStore({ reducer: ordersFeedSlice.reducer });

    await store.dispatch(getOrdersFeed());

    const state = store.getState();

    expect(state.orders).toEqual([]);
    expect(state.stats).toEqual({ total: 0, totalToday: 0 });
    expect(state.status).toEqual("failed");
    expect(state.error).toEqual("API Error");
  });
});
