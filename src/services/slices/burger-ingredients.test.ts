import { configureStore } from '@reduxjs/toolkit';

import { burgerAPIClient } from '../../clients/burger-api';
import type { TIngredient } from '../../utils/types';
import {
  burgerIngredientsSlice,
  fetchBurgerIngredients,
  resetIngredientsError,
  clearIngredients,
  burgerIngredientsInitialState
} from './burger-ingredients';

jest.mock('../../clients/burger-api');

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Bun A',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 250,
    price: 2,
    image: 'img',
    image_large: 'img_large',
    image_mobile: 'img_mobile'
  },
  {
    _id: '2',
    name: 'Main A',
    type: 'main',
    proteins: 20,
    fat: 10,
    carbohydrates: 5,
    calories: 350,
    price: 5,
    image: 'img',
    image_large: 'img_large',
    image_mobile: 'img_mobile'
  }
];

describe('burgerIngredientsSlice', () => {
  it('should handle resetIngredientsError', () => {
    const state = {
      ...burgerIngredientsInitialState,
      error: 'Error'
    };

    const nextState = burgerIngredientsSlice.reducer(
      state,
      resetIngredientsError()
    );

    expect(nextState.error).toBeNull();
  });

  it('should handle clearIngredients', () => {
    const state = {
      ...burgerIngredientsInitialState,
      items: mockIngredients
    };

    const nextState = burgerIngredientsSlice.reducer(state, clearIngredients());

    expect(nextState.items).toEqual([]);
  });

  it('should handle fetchBurgerIngredients pending', () => {
    const action = { type: fetchBurgerIngredients.pending.type };
    const nextState = burgerIngredientsSlice.reducer(
      burgerIngredientsInitialState,
      action
    );

    expect(nextState.loading).toEqual('pending');
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchBurgerIngredients fulfilled', async () => {
    (burgerAPIClient.getIngredients as jest.Mock).mockResolvedValue(
      mockIngredients
    );

    const store = configureStore({ reducer: burgerIngredientsSlice.reducer });

    await store.dispatch(fetchBurgerIngredients());

    const state = store.getState();

    expect(state.items).toEqual(mockIngredients);
    expect(state.loading).toEqual('succeeded');
    expect(state.error).toBeNull();
  });

  it('should handle fetchBurgerIngredients rejected', async () => {
    (burgerAPIClient.getIngredients as jest.Mock).mockRejectedValue(
      new Error('API Error')
    );

    const store = configureStore({ reducer: burgerIngredientsSlice.reducer });

    await store.dispatch(fetchBurgerIngredients());

    const state = store.getState();

    expect(state.items).toEqual([]);
    expect(state.loading).toEqual('failed');
    expect(state.error).toEqual('API Error');
  });
});
