import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { registerUserApi } from '@api';
import type { TAuthResponse, TRegisterData } from '@api';
import { TUser } from '@utils-types';

type TProfileState = {
  user: TUser | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  registerRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  registerError: string | null;
};

const initialState: TProfileState = {
  user: null,
  loading: 'idle',
  registerRequestStatus: 'idle',
  registerError: null
};

export const registerUser = createAsyncThunk(
  'profile/registerUser',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(registerData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при регистрации пользователя'
      );
    }
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearRegisterStatus(state) {
      state.registerRequestStatus = 'idle';
      state.registerError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerRequestStatus = 'pending';
        state.registerError = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.registerRequestStatus = 'succeeded';
          state.user = action.payload.user;
          state.registerError = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.registerRequestStatus = 'failed';
        state.registerError = action.payload as string;
      });
  }
});

export const selectUser = (state: { profile: TProfileState }) =>
  state.profile.user;

export const selectUserIsLoading = (state: { profile: TProfileState }) =>
  state.profile.loading === 'pending';

export const selectRegisterError = (state: { profile: TProfileState }) =>
  state.profile.registerError;

export const selectRegisterRequestStatus = (state: {
  profile: TProfileState;
}) => state.profile.registerRequestStatus;

export const { clearRegisterStatus } = profileSlice.actions;
