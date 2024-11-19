// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  username: string | null;
}

const initialState: UserState = {
  userId: null,
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: { userId: any; username: any; }, action: PayloadAction<{ userId: string; username: string }>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    clearUser: (state) => {
      state.userId = null;
      state.username = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
