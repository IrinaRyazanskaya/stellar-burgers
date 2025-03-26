import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserApi, loginUserApi, registerUserApi } from '@api';
import type { TLoginData, TRegisterData } from '@api';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

type TProfileState = {
  user: TUser | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';

  loginRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  loginError: string | null;

  registerRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  registerError: string | null;
};

const initialState: TProfileState = {
  user: null,
  loading: 'idle',

  loginRequestStatus: 'idle',
  loginError: null,

  registerRequestStatus: 'idle',
  registerError: null
};

export const getUser = createAsyncThunk(
  'profile/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getUserApi();
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при получении данных пользователя'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'profile/loginUser',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(loginData);
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при аутентификации пользователя'
      );
    }
  }
);

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
    clearLoginStatus(state) {
      state.loginRequestStatus = 'idle';
      state.loginError = null;
    },
    clearRegisterStatus(state) {
      state.registerRequestStatus = 'idle';
      state.registerError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = 'failed';
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loginRequestStatus = 'pending';
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginRequestStatus = 'succeeded';
        state.user = action.payload.user;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginRequestStatus = 'failed';
        state.loginError = action.payload as string;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.registerRequestStatus = 'pending';
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerRequestStatus = 'succeeded';
        state.user = action.payload.user;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerRequestStatus = 'failed';
        state.registerError = action.payload as string;
      });
  }
});

export const selectUser = (state: { profile: TProfileState }) =>
  state.profile.user;

export const selectGetUserRequestStatus = (state: { profile: TProfileState }) =>
  state.profile.loading;

export const selectLoginError = (state: { profile: TProfileState }) =>
  state.profile.loginError;

export const selectLoginRequestStatus = (state: { profile: TProfileState }) =>
  state.profile.loginRequestStatus;

export const selectRegisterError = (state: { profile: TProfileState }) =>
  state.profile.registerError;

export const selectRegisterRequestStatus = (state: {
  profile: TProfileState;
}) => state.profile.registerRequestStatus;

export const { clearLoginStatus, clearRegisterStatus } = profileSlice.actions;
