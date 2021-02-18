import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from 'redux/store';

interface Redirect {
  path?: string;
  message?: string;
  success?: boolean;
}

interface RedirectState {
  redirect: Redirect;
};

const initialState: RedirectState = {
  redirect: {
    path: "",
    message: "",
    success: false
  }
};

const slice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    setRedirect(state: RedirectState, action: PayloadAction<RedirectState>) {
      const { redirect } = action.payload;

      state.redirect = redirect;
    },
  }
});

export const reducer = slice.reducer;

export const setRedirect = (redirect): AppThunk => async (dispatch) => {

  dispatch(slice.actions.setRedirect({redirect}));
};

export default slice;