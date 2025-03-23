import { createSlice } from '@reduxjs/toolkit';
import type { TConstructorIngredient, TOrder } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderModalData: TOrder | null;
  orderRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
  orderModalData: null,
  orderRequestStatus: 'idle'
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    clear: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.orderModalData = null;
      state.orderRequestStatus = 'idle';
    }
  }
});

export const selectBurgerConstructorItems = (state: {
  burgerConstructor: TBurgerConstructorState;
}) => ({
  bun: state.burgerConstructor.bun,
  ingredients: state.burgerConstructor.ingredients
});

export const selectIsBurgerOrderPending = (state: {
  burgerConstructor: TBurgerConstructorState;
}) => {
  if (state.burgerConstructor.orderRequestStatus === 'pending') {
    return true;
  }

  return false;
};

export const selectBurgerOrderModalData = (state: {
  burgerConstructor: TBurgerConstructorState;
}) => state.burgerConstructor.orderModalData;
