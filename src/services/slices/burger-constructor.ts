import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { generateStringId } from '../../utils/id-generator';
import type { TConstructorIngredient, TIngredient } from '../../utils/types';
import { createBurgerOrder } from './burger-order';

export type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const burgerConstructorInitialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: burgerConstructorInitialState,
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
    },
    moveIngredientUpInConstructor: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      if (index > 0 && index < state.ingredients.length) {
        const currentIngredient = state.ingredients[index];

        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = currentIngredient;
      }
    },
    moveIngredientDownInConstructor: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      if (index >= 0 && index < state.ingredients.length - 1) {
        const currentIngredient = state.ingredients[index];

        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = currentIngredient;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createBurgerOrder.fulfilled, (state, action) => {
      state.bun = null;
      state.ingredients = [];
    });
  }
});

export const selectBurgerConstructorItems = (state: {
  burgerConstructor: TBurgerConstructorState;
}) => ({
  bun: state.burgerConstructor.bun,
  ingredients: state.burgerConstructor.ingredients
});

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientUpInConstructor,
  moveIngredientDownInConstructor
} = burgerConstructorSlice.actions;
