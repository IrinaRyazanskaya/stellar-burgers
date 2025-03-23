import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TProfileState = {
  user: TUser | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: TProfileState = {
  user: null,
  loading: 'idle'
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {}
});

export const selectUser = (state: { profile: TProfileState }) =>
  state.profile.user;

export const selectUserIsLoading = (state: { profile: TProfileState }) =>
  state.profile.loading === 'pending';
