import { configureStore } from '@reduxjs/toolkit';

import { getFeedsApi } from '@clients';
import type { TOrder } from '@utils-types';
import {
  ordersFeedSlice,
  getOrdersFeed,
  ordersFeedInitialState
} from './orders-feed';

jest.mock('@clients');

const mockOrders: TOrder[] = [
  {
    _id: '1',
    number: 101,
    name: 'Order One',
    status: 'done',
    ingredients: ['ingredient1', 'ingredient2'],
    createdAt: '2024-04-01T10:00:00.000Z',
    updatedAt: '2024-04-01T10:30:00.000Z'
  },
  {
    _id: '2',
    number: 102,
    name: 'Order Two',
    status: 'pending',
    ingredients: ['ingredient3'],
    createdAt: '2024-04-01T11:00:00.000Z',
    updatedAt: '2024-04-01T11:15:00.000Z'
  }
];

describe('ordersFeedSlice', () => {
  it('should handle getOrdersFeed pending', () => {
    const action = { type: getOrdersFeed.pending.type };

    const nextState = ordersFeedSlice.reducer(ordersFeedInitialState, action);

    expect(nextState.orders).toEqual([]);
    expect(nextState.stats).toEqual({ total: 0, totalToday: 0 });
    expect(nextState.requestStatus).toEqual('pending');
    expect(nextState.requestError).toBeNull();
  });

  it('should handle getOrdersFeed fulfilled', async () => {
    const payload = {
      orders: mockOrders,
      total: 200,
      totalToday: 25
    };

    (getFeedsApi as jest.Mock).mockResolvedValue(payload);

    const store = configureStore({ reducer: ordersFeedSlice.reducer });

    await store.dispatch(getOrdersFeed());

    const state = store.getState();

    expect(state.orders).toEqual(mockOrders);
    expect(state.stats).toEqual({ total: 200, totalToday: 25 });
    expect(state.requestStatus).toEqual('succeeded');
    expect(state.requestError).toBeNull();
  });

  it('should handle getOrdersFeed rejected', async () => {
    (getFeedsApi as jest.Mock).mockRejectedValue(new Error('API Error'));

    const store = configureStore({ reducer: ordersFeedSlice.reducer });

    await store.dispatch(getOrdersFeed());

    const state = store.getState();

    expect(state.orders).toEqual([]);
    expect(state.stats).toEqual({ total: 0, totalToday: 0 });
    expect(state.requestStatus).toEqual('failed');
    expect(state.requestError).toEqual('API Error');
  });
});
