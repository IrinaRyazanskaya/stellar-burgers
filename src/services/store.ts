import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { burgerConstructorSlice } from './slices/burger-constructor';
import { burgerIngredientsSlice } from './slices/burger-ingredients';
import { burgerOrderSlice } from './slices/burger-order';
import { profileSlice } from './slices/profile';
import { profileOrdersSlice } from './slices/profile-orders';
import { ordersFeedSlice } from './slices/orders-feed';
import { orderInfoSlice } from './slices/order-info';

export const rootReducer = combineSlices(
  burgerConstructorSlice,
  burgerIngredientsSlice,
  burgerOrderSlice,
  profileSlice,
  profileOrdersSlice,
  ordersFeedSlice,
  orderInfoSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: __MODE__ === 'development'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
