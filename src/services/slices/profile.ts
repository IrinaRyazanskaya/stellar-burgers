import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../clients/burger-api';
import type { TLoginData, TRegisterData } from '../../clients/burger-api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export type TProfileState = {
  user: TUser | null;
  userStatus: 'unknown' | 'authorized' | 'unauthorized';

  getUserRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  getUserError: string | null;

  loginRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  loginError: string | null;

  registerRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  registerError: string | null;

  updateRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  updateError: string | null;
};

export const profileInitialState: TProfileState = {
  user: null,
  userStatus: 'unknown',

  getUserRequestStatus: 'idle',
  getUserError: null,

  loginRequestStatus: 'idle',
  loginError: null,

  registerRequestStatus: 'idle',
  registerError: null,

  updateRequestStatus: 'idle',
  updateError: null
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

export const logoutUser = createAsyncThunk(
  'profile/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при выходе из аккаунта'
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

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(registerData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при обновлении данных пользователя'
      );
    }
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState: profileInitialState,
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
        state.getUserRequestStatus = 'pending';
        state.getUserError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userStatus = 'authorized';

        state.getUserRequestStatus = 'succeeded';
        state.getUserError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userStatus = 'unauthorized';

        state.getUserRequestStatus = 'failed';
        state.getUserError = action.payload as string;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loginRequestStatus = 'pending';
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userStatus = 'authorized';

        state.loginRequestStatus = 'succeeded';
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userStatus = 'unauthorized';

        state.loginRequestStatus = 'failed';
        state.loginError = action.payload as string;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.userStatus = 'unauthorized';

      state.getUserRequestStatus = 'idle';
    });

    builder
      .addCase(registerUser.pending, (state) => {
        state.registerRequestStatus = 'pending';
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userStatus = 'authorized';

        state.registerRequestStatus = 'succeeded';
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userStatus = 'unauthorized';

        state.registerRequestStatus = 'failed';
        state.registerError = action.payload as string;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.updateRequestStatus = 'pending';
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;

        state.updateRequestStatus = 'succeeded';
        state.updateError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateRequestStatus = 'failed';
        state.updateError = action.payload as string;
      });
  }
});

export const selectUser = (state: { profile: TProfileState }) =>
  state.profile.user;

export const selectUserStatus = (state: { profile: TProfileState }) =>
  state.profile.userStatus;

export const selectGetUserError = (state: { profile: TProfileState }) =>
  state.profile.getUserError;

export const selectGetUserRequestStatus = (state: { profile: TProfileState }) =>
  state.profile.getUserRequestStatus;

export const selectLoginError = (state: { profile: TProfileState }) =>
  state.profile.loginError;

export const selectLoginRequestStatus = (state: { profile: TProfileState }) =>
  state.profile.loginRequestStatus;

export const selectRegisterError = (state: { profile: TProfileState }) =>
  state.profile.registerError;

export const selectRegisterRequestStatus = (state: {
  profile: TProfileState;
}) => state.profile.registerRequestStatus;

export const selectUpdateError = (state: { profile: TProfileState }) =>
  state.profile.updateError;

export const selectUpdateRequestStatus = (state: { profile: TProfileState }) =>
  state.profile.updateRequestStatus;

export const { clearLoginStatus, clearRegisterStatus } = profileSlice.actions;
