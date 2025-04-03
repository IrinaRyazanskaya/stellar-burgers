import { configureStore } from '@reduxjs/toolkit';

import { orderBurgerApi } from '@api';
import type { TOrder } from '@utils-types';
import {
  burgerOrderSlice,
  createBurgerOrder,
  clearBurgerOrderStatus,
  burgerOrderInitialState,
  TBurgerOrderState
} from './burger-order';

jest.mock('@api');

const mockOrder: TOrder = {
  _id: '1',
  number: 123,
  name: 'Test Burger Order',
  status: 'completed',
  ingredients: ['1', '2'],
  createdAt: '2024-04-01T00:00:00Z',
  updatedAt: '2024-04-01T01:00:00Z'
};

describe('burgerOrderSlice', () => {
  it('should handle clearBurgerOrderStatus', () => {
    const state: TBurgerOrderState = {
      order: mockOrder,
      orderRequestStatus: 'succeeded',
      orderError: 'Some error'
    };

    const nextState = burgerOrderSlice.reducer(state, clearBurgerOrderStatus());

    expect(nextState).toEqual(burgerOrderInitialState);
  });

  it('should handle createBurgerOrder pending', () => {
    const action = { type: createBurgerOrder.pending.type };

    const nextState = burgerOrderSlice.reducer(burgerOrderInitialState, action);

    expect(nextState.orderRequestStatus).toEqual('pending');
    expect(nextState.order).toBeNull();
    expect(nextState.orderError).toBeNull();
  });

  it('should handle createBurgerOrder fulfilled', async () => {
    (orderBurgerApi as jest.Mock).mockResolvedValue({ order: mockOrder });

    const store = configureStore({ reducer: burgerOrderSlice.reducer });

    await store.dispatch(createBurgerOrder(['1', '2']));

    const state = store.getState();

    expect(state.order).toEqual(mockOrder);
    expect(state.orderRequestStatus).toEqual('succeeded');
    expect(state.orderError).toBeNull();
  });

  it('should handle createBurgerOrder rejected', async () => {
    (orderBurgerApi as jest.Mock).mockRejectedValue(new Error('API Error'));

    const store = configureStore({ reducer: burgerOrderSlice.reducer });

    await store.dispatch(createBurgerOrder(['1', '2']));

    const state = store.getState();

    expect(state.order).toBeNull();
    expect(state.orderRequestStatus).toEqual('failed');
    expect(state.orderError).toEqual('API Error');
  });
});
