import {Session} from '@supabase/supabase-js';
import {createSlice, PayloadAction} from '@reduxjs/toolkit/';

type AuthType = {
  user: Session | null;
  loading: boolean;
};

const initialState: AuthType = {
  user: null,
  loading: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Session | null>) {
      state.user = action.payload;
    },

    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {setUser, setAuthLoading} = AuthSlice.actions;
export default AuthSlice.reducer;
