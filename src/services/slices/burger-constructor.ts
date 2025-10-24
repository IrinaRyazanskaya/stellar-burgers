import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { generateStringId } from "../../utils/id-generator";
import type { ConstructorIngredient, Ingredient } from "../../utils/types";
import { createBurgerOrder } from "./burger-order";

type BurgerConstructorState = {
  bun: ConstructorIngredient | null;
  ingredients: ConstructorIngredient[];
};

const burgerConstructorInitialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState: burgerConstructorInitialState,
  reducers: {
    addIngredientToConstructor: (state, action: PayloadAction<Ingredient>) => {
      if (action.payload.type === "bun") {
        state.bun = { ...action.payload, id: generateStringId() };
      } else {
        state.ingredients.push({ ...action.payload, id: generateStringId() });
      }
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBurgerOrder.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  },
});

const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientUpInConstructor,
  moveIngredientDownInConstructor,
} = burgerConstructorSlice.actions;

const selectBurgerConstructorItems = (state: { burgerConstructor: BurgerConstructorState }) => ({
  bun: state.burgerConstructor.bun,
  ingredients: state.burgerConstructor.ingredients,
});

export {
  // State
  burgerConstructorSlice,
  burgerConstructorInitialState,
  // Actions
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientUpInConstructor,
  moveIngredientDownInConstructor,
  // Selectors
  selectBurgerConstructorItems,
};

export type { BurgerConstructorState };
