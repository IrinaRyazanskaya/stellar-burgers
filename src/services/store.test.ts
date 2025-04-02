import { rootReducer } from './store';
import {
  burgerConstructorSlice,
  burgerIngredientsSlice,
  burgerOrderSlice,
  profileSlice,
  profileOrdersSlice,
  ordersFeedSlice,
  orderInfoSlice
} from '@slices';

describe('rootReducer', () => {
  test('should return the correct initial state', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      burgerConstructor: burgerConstructorSlice.getInitialState(),
      burgerIngredients: burgerIngredientsSlice.getInitialState(),
      burgerOrder: burgerOrderSlice.getInitialState(),
      profile: profileSlice.getInitialState(),
      profileOrders: profileOrdersSlice.getInitialState(),
      ordersFeed: ordersFeedSlice.getInitialState(),
      orderInfo: orderInfoSlice.getInitialState()
    });
  });
});
