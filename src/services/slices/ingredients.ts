import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getIngredientsApi } from '@api';
import type { TIngredient } from '@utils-types';

type TIngredientsState = {
  items: TIngredient[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: TIngredientsState = {
  items: [],
  loading: 'idle',
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
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

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
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
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { resetIngredientsError, clearIngredients } =
  ingredientsSlice.actions;

export const selectBuns = (state: { ingredients: TIngredientsState }) =>
  state.ingredients.items.filter((item) => item.type === 'bun');

export const selectMains = (state: { ingredients: TIngredientsState }) =>
  state.ingredients.items.filter((item) => item.type === 'main');

export const selectSauces = (state: { ingredients: TIngredientsState }) =>
  state.ingredients.items.filter((item) => item.type === 'sauce');

export const selectIngredientsIsLoading = (state: {
  ingredients: TIngredientsState;
}) => {
  if (state.ingredients.loading === 'pending') {
    return true;
  }

  return false;
};

export const selectIngredientsError = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.error;

export const ingredientsReducer = ingredientsSlice.reducer;
