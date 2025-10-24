import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { burgerAPIClient } from "../../clients/burger-api";
import type { LoginData, RegisterData } from "../../clients/burger-api";
import { deleteCookie, setCookie } from "../../utils/cookie";
import type { User } from "../../utils/types";

type ProfileState = {
  user: User | null;
  userStatus: "unknown" | "authorized" | "unauthorized";

  getUserError: string | null;
  getUserStatus: "idle" | "pending" | "succeeded" | "failed";

  loginError: string | null;
  loginStatus: "idle" | "pending" | "succeeded" | "failed";

  registerError: string | null;
  registerStatus: "idle" | "pending" | "succeeded" | "failed";

  updateError: string | null;
  updateStatus: "idle" | "pending" | "succeeded" | "failed";
};

const profileInitialState: ProfileState = {
  user: null,
  userStatus: "unknown",

  getUserError: null,
  getUserStatus: "idle",

  loginError: null,
  loginStatus: "idle",

  registerError: null,
  registerStatus: "idle",

  updateError: null,
  updateStatus: "idle",
};

const getUser = createAsyncThunk("profile/getUser", async (_, { rejectWithValue }) => {
  try {
    const user = await burgerAPIClient.getUser();
    return user;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Произошла ошибка при получении данных пользователя",
    );
  }
});

const loginUser = createAsyncThunk(
  "profile/loginUser",
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const data = await burgerAPIClient.loginUser(loginData);
      setCookie("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Произошла ошибка при аутентификации пользователя",
      );
    }
  },
);

const logoutUser = createAsyncThunk("profile/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await logoutUser();
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Произошла ошибка при выходе из аккаунта",
    );
  }
});

const updateUser = createAsyncThunk(
  "profile/updateUser",
  async (registerData: RegisterData, { rejectWithValue }) => {
    try {
      const data = await burgerAPIClient.updateUser(registerData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при обновлении данных пользователя",
      );
    }
  },
);

const registerUser = createAsyncThunk(
  "profile/registerUser",
  async (registerData: RegisterData, { rejectWithValue }) => {
    try {
      const data = await burgerAPIClient.registerUser(registerData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Произошла ошибка при регистрации пользователя",
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: profileInitialState,
  reducers: {
    clearLoginStatus(state) {
      state.loginStatus = "idle";
      state.loginError = null;
    },
    clearRegisterStatus(state) {
      state.registerStatus = "idle";
      state.registerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.getUserStatus = "pending";
        state.getUserError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userStatus = "authorized";

        state.getUserStatus = "succeeded";
        state.getUserError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userStatus = "unauthorized";

        state.getUserStatus = "failed";
        state.getUserError = action.payload as string;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "pending";
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userStatus = "authorized";

        state.loginStatus = "succeeded";
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userStatus = "unauthorized";

        state.loginStatus = "failed";
        state.loginError = action.payload as string;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.userStatus = "unauthorized";

      state.getUserStatus = "idle";
    });

    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "pending";
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userStatus = "authorized";

        state.registerStatus = "succeeded";
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userStatus = "unauthorized";

        state.registerStatus = "failed";
        state.registerError = action.payload as string;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "pending";
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;

        state.updateStatus = "succeeded";
        state.updateError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload as string;
      });
  },
});

const { clearLoginStatus, clearRegisterStatus } = profileSlice.actions;

const selectUser = (state: { profile: ProfileState }) => {
  return state.profile.user;
};

const selectUserStatus = (state: { profile: ProfileState }) => {
  return state.profile.userStatus;
};

const selectGetUserError = (state: { profile: ProfileState }) => {
  return state.profile.getUserError;
};

const selectGetUserStatus = (state: { profile: ProfileState }) => {
  return state.profile.getUserStatus;
};

const selectLoginError = (state: { profile: ProfileState }) => {
  return state.profile.loginError;
};

const selectLoginStatus = (state: { profile: ProfileState }) => {
  return state.profile.loginStatus;
};

const selectUpdateError = (state: { profile: ProfileState }) => {
  return state.profile.updateError;
};

const selectUpdateStatus = (state: { profile: ProfileState }) => {
  return state.profile.updateStatus;
};

const selectRegisterError = (state: { profile: ProfileState }) => {
  return state.profile.registerError;
};

const selectRegisterStatus = (state: { profile: ProfileState }) => {
  return state.profile.registerStatus;
};

export {
  // State
  profileSlice,
  profileInitialState,
  // Actions
  getUser,
  loginUser,
  logoutUser,
  updateUser,
  registerUser,
  clearLoginStatus,
  clearRegisterStatus,
  // Selectors
  selectUser,
  selectUserStatus,
  selectGetUserError,
  selectGetUserStatus,
  selectLoginError,
  selectLoginStatus,
  selectUpdateError,
  selectUpdateStatus,
  selectRegisterError,
  selectRegisterStatus,
};

export type { ProfileState };
