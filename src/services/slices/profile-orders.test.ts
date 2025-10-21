import { configureStore } from '@reduxjs/toolkit';

import { getOrdersApi } from '@clients';
import type { TOrder } from '@utils-types';
import {
  profileOrdersSlice,
  getProfileOrders,
  profileOrdersInitialState
} from './profile-orders';

jest.mock('@clients');

const mockProfileOrders: TOrder[] = [
  {
    _id: 'orderA',
    number: 111,
    status: 'created',
    name: 'User Order A',
    ingredients: ['ing1', 'ing2'],
    createdAt: '2024-04-02T09:00:00.000Z',
    updatedAt: '2024-04-02T09:15:00.000Z'
  },
  {
    _id: 'orderB',
    number: 112,
    name: 'User Order B',
    status: 'done',
    ingredients: ['ing3'],
    createdAt: '2024-04-02T10:00:00.000Z',
    updatedAt: '2024-04-02T10:20:00.000Z'
  }
];

describe('profileOrdersSlice', () => {
  it('should handle getProfileOrders pending', () => {
    const action = { type: getProfileOrders.pending.type };

    const nextState = profileOrdersSlice.reducer(
      profileOrdersInitialState,
      action
    );

    expect(nextState.orders).toEqual([]);
    expect(nextState.requestStatus).toBe('pending');
    expect(nextState.requestError).toBeNull();
  });

  it('should handle getProfileOrders fulfilled', async () => {
    (getOrdersApi as jest.Mock).mockResolvedValue(mockProfileOrders);

    const store = configureStore({ reducer: profileOrdersSlice.reducer });

    await store.dispatch(getProfileOrders());

    const state = store.getState();

    expect(state.orders).toEqual(mockProfileOrders);
    expect(state.requestStatus).toBe('succeeded');
    expect(state.requestError).toBeNull();
  });

  it('should handle getProfileOrders rejected', async () => {
    (getOrdersApi as jest.Mock).mockRejectedValue(
      new Error('Profile API Error')
    );

    const store = configureStore({ reducer: profileOrdersSlice.reducer });

    await store.dispatch(getProfileOrders());

    const state = store.getState();

    expect(state.orders).toEqual([]);
    expect(state.requestStatus).toBe('failed');
    expect(state.requestError).toBe('Profile API Error');
  });
});
