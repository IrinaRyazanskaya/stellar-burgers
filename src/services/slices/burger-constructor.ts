import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { generateStringId } from '../../utils/id-generator';

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
    addIngredientToConstructor: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = { ...action.payload, id: generateStringId() };
      } else {
        state.ingredients.push({ ...action.payload, id: generateStringId() });
      }
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
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

export const { addIngredientToConstructor, removeIngredientFromConstructor } =
  burgerConstructorSlice.actions;
