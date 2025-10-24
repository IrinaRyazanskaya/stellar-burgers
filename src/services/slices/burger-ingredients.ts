import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { burgerAPIClient } from "../../clients/burger-api";
import type { Ingredient } from "../../utils/types";

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

const selectBurgerBuns = (state: { burgerIngredients: BurgerIngredientsState }) => {
  return state.burgerIngredients.items.filter((item) => item.type === "bun");
};

const selectBurgerMains = (state: { burgerIngredients: BurgerIngredientsState }) => {
  return state.burgerIngredients.items.filter((item) => item.type === "main");
};

const selectBurgerSauces = (state: { burgerIngredients: BurgerIngredientsState }) => {
  return state.burgerIngredients.items.filter((item) => item.type === "sauce");
};

const selectBurgerIngredients = (state: { burgerIngredients: BurgerIngredientsState }) => {
  return state.burgerIngredients.items;
};

const selectIngredientById = (state: { burgerIngredients: BurgerIngredientsState }, id: string) => {
  return state.burgerIngredients.items.find((item) => item._id === id) || null;
};

const selectBurgerIngredientsError = (state: { burgerIngredients: BurgerIngredientsState }) => {
  return state.burgerIngredients.error;
};

const selectBurgerIngredientsStatus = (state: { burgerIngredients: BurgerIngredientsState }) => {
  return state.burgerIngredients.status;
};

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
