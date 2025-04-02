import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getIngredientsApi } from '@api';
import type { TIngredient } from '@utils-types';

export type TBurgerIngredientsState = {
  items: TIngredient[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
};

export const burgerIngredientsInitialState: TBurgerIngredientsState = {
  items: [],
  loading: 'idle',
  error: null
};

export const fetchBurgerIngredients = createAsyncThunk(
  'ingredients/fetchBurgerIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при загрузке ингредиентов'
      );
    }
  }
);

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState: burgerIngredientsInitialState,
  reducers: {
    resetIngredientsError: (state) => {
      state.error = null;
    },
    clearIngredients: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgerIngredients.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(
        fetchBurgerIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(fetchBurgerIngredients.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { resetIngredientsError, clearIngredients } =
  burgerIngredientsSlice.actions;

export const selectBurgerBuns = (state: {
  burgerIngredients: TBurgerIngredientsState;
}) => state.burgerIngredients.items.filter((item) => item.type === 'bun');

export const selectBurgerMains = (state: {
  burgerIngredients: TBurgerIngredientsState;
}) => state.burgerIngredients.items.filter((item) => item.type === 'main');

export const selectBurgerSauces = (state: {
  burgerIngredients: TBurgerIngredientsState;
}) => state.burgerIngredients.items.filter((item) => item.type === 'sauce');

export const selectBurgerIngredients = (state: {
  burgerIngredients: TBurgerIngredientsState;
}) => state.burgerIngredients.items;

export const selectIngredientById = (
  state: {
    burgerIngredients: TBurgerIngredientsState;
  },
  id: string
) => state.burgerIngredients.items.find((item) => item._id === id) || null;

export const selectBurgerIngredientsIsLoading = (state: {
  burgerIngredients: TBurgerIngredientsState;
}) => state.burgerIngredients.loading === 'pending';

export const selectBurgerIngredientsRequestError = (state: {
  burgerIngredients: TBurgerIngredientsState;
}) => state.burgerIngredients.error;
