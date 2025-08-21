import { createSlice,  } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  login: string;
}
const initialState: AuthState = {
  login: '',
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
  },
});


export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;