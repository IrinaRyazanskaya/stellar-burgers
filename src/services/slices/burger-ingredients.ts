import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { burgerAPIClient } from "../../clients/burger-api";
import type { Ingredient } from "../../utils/types";
import type { RootState } from "../store";

type BurgerIngredientsState = {
  items: Ingredient[];
  error: string | null;
  status: "idle" | "pending" | "succeeded" | "failed";
};

const burgerIngredientsInitialState: BurgerIngredientsState = {
  items: [],
  error: null,
  status: "idle",
};

const fetchBurgerIngredients = createAsyncThunk(
  "ingredients/fetchBurgerIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const data = await burgerAPIClient.getIngredients();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Произошла ошибка при загрузке ингредиентов",
      );
    }
  },
);

const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState: burgerIngredientsInitialState,
  reducers: {
    resetIngredientsError: (state) => {
      state.error = null;
    },
    clearIngredients: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgerIngredients.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchBurgerIngredients.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBurgerIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

const { resetIngredientsError, clearIngredients } = burgerIngredientsSlice.actions;

const selectSelectedIngredientId = (_: RootState, id: string) => id;

const selectBurgerIngredientsState = (state: RootState) => {
  return state.burgerIngredients;
};

const selectBurgerIngredients = createSelector(
  [selectBurgerIngredientsState],
  (burgerIngredients) => {
    return burgerIngredients.items;
  },
);

const selectBurgerBuns = createSelector(selectBurgerIngredients, (items) => {
  return items.filter((item) => item.type === "bun");
});

const selectBurgerMains = createSelector(selectBurgerIngredients, (items) => {
  return items.filter((item) => item.type === "main");
});

const selectBurgerSauces = createSelector(selectBurgerIngredients, (items) => {
  return items.filter((item) => item.type === "sauce");
});

const selectIngredientById = createSelector(
  [selectBurgerIngredients, selectSelectedIngredientId],
  (items, id) => items.find((item) => item._id === id) ?? null,
);

const selectBurgerIngredientsError = createSelector(
  selectBurgerIngredientsState,
  (burgerIngredients) => burgerIngredients.error,
);

const selectBurgerIngredientsStatus = createSelector(
  selectBurgerIngredientsState,
  (burgerIngredients) => burgerIngredients.status,
);

export {
  // State
  burgerIngredientsSlice,
  burgerIngredientsInitialState,
  // Actions
  fetchBurgerIngredients,
  resetIngredientsError,
  clearIngredients,
  // Selectors
  selectBurgerBuns,
  selectBurgerMains,
  selectBurgerSauces,
  selectBurgerIngredients,
  selectIngredientById,
  selectBurgerIngredientsError,
  selectBurgerIngredientsStatus,
};

export type { BurgerIngredientsState };
