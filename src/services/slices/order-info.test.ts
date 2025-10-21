import { configureStore } from '@reduxjs/toolkit';

import { getOrderByNumberApi } from '../../clients/burger-api';
import type { TOrder } from '@utils-types';
import {
  orderInfoSlice,
  getOrderInfo,
  clearOrderInfo,
  orderInfoInitialState,
  TOrderInfoState
} from './order-info';

jest.mock('../../clients/burger-api');

const mockOrder: TOrder = {
  _id: 'order123',
  number: 123,
  name: 'Test Order',
  status: 'done',
  ingredients: ['ingredient1', 'ingredient2'],
  createdAt: '2024-04-01T12:00:00.000Z',
  updatedAt: '2024-04-01T12:30:00.000Z'
};

describe('orderInfoSlice', () => {
  it('should handle clearOrderInfo', () => {
    const state: TOrderInfoState = {
      order: mockOrder,
      orderRequestStatus: 'succeeded',
      orderRequestError: 'Some Error'
    };

    const nextState = orderInfoSlice.reducer(state, clearOrderInfo());

    expect(nextState).toEqual(orderInfoInitialState);
  });

  it('should handle getOrderInfo pending', () => {
    const action = { type: getOrderInfo.pending.type };

    const nextState = orderInfoSlice.reducer(orderInfoInitialState, action);

    expect(nextState.orderRequestStatus).toEqual('pending');
    expect(nextState.order).toBeNull();
    expect(nextState.orderRequestError).toBeNull();
  });

  it('should handle getOrderInfo fulfilled', async () => {
    (getOrderByNumberApi as jest.Mock).mockResolvedValue({
      orders: [mockOrder]
    });

    const store = configureStore({ reducer: orderInfoSlice.reducer });

    await store.dispatch(getOrderInfo(123));

    const state = store.getState();

    expect(state.orderRequestStatus).toEqual('succeeded');
    expect(state.order).toEqual(mockOrder);
    expect(state.orderRequestError).toBeNull();
  });

  it('should handle getOrderInfo rejected', async () => {
    (getOrderByNumberApi as jest.Mock).mockRejectedValue(
      new Error('API Error')
    );

    const store = configureStore({ reducer: orderInfoSlice.reducer });

    await store.dispatch(getOrderInfo(123));

    const state = store.getState();

    expect(state.orderRequestStatus).toEqual('failed');
    expect(state.order).toBeNull();
    expect(state.orderRequestError).toEqual('API Error');
  });
});
