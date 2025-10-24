import { configureStore } from "@reduxjs/toolkit";

import { burgerAPIClient } from "../../clients/burger-api";
import type { AuthResponse, LoginData, RegisterData } from "../../clients/burger-api";
import type { User } from "../../utils/types";
import {
  profileSlice,
  profileInitialState,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  clearLoginStatus,
  clearRegisterStatus,
} from "./profile";
import type { TProfileState } from "./profile";

jest.mock("../../clients/burger-api");
jest.mock("../../utils/cookie", () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

const mockUser: User = {
  name: "Test User",
  email: "test@example.com",
};

const mockLoginData: LoginData = {
  email: "test@example.com",
  password: "password123",
};

const mockRegisterData: RegisterData = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
};

const mockAuthResponse: AuthResponse = {
  success: true,
  user: mockUser,
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
};

describe("profileSlice", () => {
  it("should handle clearLoginStatus", () => {
    const state: TProfileState = {
      ...profileInitialState,
      loginRequestStatus: "failed",
      loginError: "Some error",
    };

    const nextState = profileSlice.reducer(state, clearLoginStatus());

    expect(nextState.loginRequestStatus).toEqual("idle");
    expect(nextState.loginError).toBeNull();
    expect(nextState.user).toEqual(state.user);
    expect(nextState.userStatus).toEqual(state.userStatus);
  });

  it("should handle clearRegisterStatus", () => {
    const state: TProfileState = {
      ...profileInitialState,
      registerRequestStatus: "failed",
      registerError: "Registration error",
    };

    const nextState = profileSlice.reducer(state, clearRegisterStatus());

    expect(nextState.registerRequestStatus).toEqual("idle");
    expect(nextState.registerError).toBeNull();
    expect(nextState.user).toEqual(state.user);
    expect(nextState.userStatus).toEqual(state.userStatus);
  });

  describe("getUser async thunk", () => {
    it("should handle getUser pending", () => {
      const action = { type: getUser.pending.type };
      const nextState = profileSlice.reducer(profileInitialState, action);

      expect(nextState.getUserRequestStatus).toEqual("pending");
      expect(nextState.getUserError).toBeNull();
    });

    it("should handle getUser fulfilled", async () => {
      (burgerAPIClient.getUser as jest.Mock).mockResolvedValue({
        user: mockUser,
      });

      const store = configureStore({ reducer: profileSlice.reducer });
      await store.dispatch(getUser());

      const state = store.getState();

      expect(state.user).toEqual(mockUser);
      expect(state.userStatus).toEqual("authorized");
      expect(state.getUserRequestStatus).toEqual("succeeded");
      expect(state.getUserError).toBeNull();
    });

    it("should handle getUser rejected", async () => {
      (burgerAPIClient.getUser as jest.Mock).mockRejectedValue(new Error("API Error"));

      const store = configureStore({ reducer: profileSlice.reducer });
      await store.dispatch(getUser());

      const state = store.getState();

      expect(state.userStatus).toEqual("unauthorized");
      expect(state.getUserRequestStatus).toEqual("failed");
      expect(state.getUserError).toEqual("API Error");
    });
  });

  describe("loginUser async thunk", () => {
    it("should handle loginUser pending", () => {
      const action = { type: loginUser.pending.type };
      const nextState = profileSlice.reducer(profileInitialState, action);

      expect(nextState.loginRequestStatus).toEqual("pending");
      expect(nextState.loginError).toBeNull();
    });

    it("should handle loginUser fulfilled", async () => {
      (burgerAPIClient.loginUser as jest.Mock).mockResolvedValue(mockAuthResponse);

      const store = configureStore({ reducer: profileSlice.reducer });
      await store.dispatch(loginUser(mockLoginData));

      const state = store.getState();

      expect(state.user).toEqual(mockUser);
      expect(state.userStatus).toEqual("authorized");
      expect(state.loginRequestStatus).toEqual("succeeded");
      expect(state.loginError).toBeNull();
    });

    it("should handle loginUser rejected", async () => {
      (burgerAPIClient.loginUser as jest.Mock).mockRejectedValue(new Error("Login Error"));

      const store = configureStore({ reducer: profileSlice.reducer });
      await store.dispatch(loginUser(mockLoginData));

      const state = store.getState();

      expect(state.userStatus).toEqual("unauthorized");
      expect(state.loginRequestStatus).toEqual("failed");
      expect(state.loginError).toEqual("Login Error");
    });
  });

  describe("logoutUser async thunk", () => {
    it("should handle logoutUser fulfilled", async () => {
      (burgerAPIClient.logoutUser as jest.Mock).mockResolvedValue(undefined);

      const initialState: TProfileState = {
        ...profileInitialState,
        user: mockUser,
        userStatus: "authorized",
      };

      const store = configureStore({
        reducer: profileSlice.reducer,
        preloadedState: initialState,
      });

      await store.dispatch(logoutUser());

      const state = store.getState();

      expect(state.user).toBeNull();
      expect(state.userStatus).toEqual("unauthorized");
      expect(state.getUserRequestStatus).toEqual("idle");
    });
  });

  describe("registerUser async thunk", () => {
    it("should handle registerUser pending", () => {
      const action = { type: registerUser.pending.type };
      const nextState = profileSlice.reducer(profileInitialState, action);

      expect(nextState.registerRequestStatus).toEqual("pending");
      expect(nextState.registerError).toBeNull();
    });

    it("should handle registerUser fulfilled", async () => {
      (burgerAPIClient.registerUser as jest.Mock).mockResolvedValue({
        user: mockUser,
      });

      const store = configureStore({ reducer: profileSlice.reducer });
      await store.dispatch(registerUser(mockRegisterData));

      const state = store.getState();

      expect(state.user).toEqual(mockUser);
      expect(state.userStatus).toEqual("authorized");
      expect(state.registerRequestStatus).toEqual("succeeded");
      expect(state.registerError).toBeNull();
    });

    it("should handle registerUser rejected", async () => {
      (burgerAPIClient.registerUser as jest.Mock).mockRejectedValue(new Error("Register Error"));

      const store = configureStore({ reducer: profileSlice.reducer });
      await store.dispatch(registerUser(mockRegisterData));

      const state = store.getState();

      expect(state.userStatus).toEqual("unauthorized");
      expect(state.registerRequestStatus).toEqual("failed");
      expect(state.registerError).toEqual("Register Error");
    });
  });

  describe("updateUser async thunk", () => {
    it("should handle updateUser pending", () => {
      const action = { type: updateUser.pending.type };
      const nextState = profileSlice.reducer(profileInitialState, action);

      expect(nextState.updateRequestStatus).toEqual("pending");
      expect(nextState.updateError).toBeNull();
    });

    it("should handle updateUser fulfilled", async () => {
      const updatedUser = { ...mockUser, name: "Updated Name" };
      (burgerAPIClient.updateUser as jest.Mock).mockResolvedValue({
        user: updatedUser,
      });

      const initialState: TProfileState = {
        ...profileInitialState,
        user: mockUser,
      };

      const store = configureStore({
        reducer: profileSlice.reducer,
        preloadedState: initialState,
      });

      await store.dispatch(updateUser(mockRegisterData));

      const state = store.getState();

      expect(state.user).toEqual(updatedUser);
      expect(state.updateRequestStatus).toEqual("succeeded");
      expect(state.updateError).toBeNull();
    });

    it("should handle updateUser rejected", async () => {
      (burgerAPIClient.updateUser as jest.Mock).mockRejectedValue(new Error("Update Error"));

      const store = configureStore({ reducer: profileSlice.reducer });
      await store.dispatch(updateUser(mockRegisterData));

      const state = store.getState();

      expect(state.updateRequestStatus).toEqual("failed");
      expect(state.updateError).toEqual("Update Error");
    });
  });
});
