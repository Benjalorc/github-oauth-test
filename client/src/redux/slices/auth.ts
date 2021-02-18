import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from 'redux/store'
import axios from 'exports/querying';
import { User } from 'types/users';

import { setRedirect } from 'redux/slices/redirect';

interface AuthState {
  user: User;
  isAuthenticated?: boolean;
};

const checkAuth = (): boolean => {
  return Boolean(localStorage.getItem("token"));
}

const emptyUser = (): User => ({
  avatar_url: "https://via.placeholder.com/150",
  bio: "",
  login: "",
  public_repos: 0
})

const initialState: AuthState = {
  user: emptyUser(),
  isAuthenticated: checkAuth()
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser(state: AuthState) {

      state.isAuthenticated = true;
    },
    loadUserData(state: AuthState, action: PayloadAction<User>) {

      state.user.avatar_url = action.payload.avatar_url || "https://via.placeholder.com/150";
      state.user.bio = action.payload.bio || "This looks a bit lonely. There is no biography to show.";
      state.user.login = action.payload.login || "";
      state.user.public_repos = action.payload.public_repos || 0;
    },
    unloadUserData(state: AuthState) {

      state.user = emptyUser();
      state.isAuthenticated = false;
    }
  }
});

export const reducer = slice.reducer;

export const setAuthToken = (token: string): AppThunk => async (dispatch) => {

  dispatch(slice.actions.authUser());
  localStorage.setItem("token", token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  dispatch(setRedirect({path: "/profile", message: "¡Welcome!", success: true}));
};

export const loadUserData = (): AppThunk => async (dispatch) => {

  try{

    const response = await axios.get("https://api.github.com/user");
    const { avatar_url, bio, login, public_repos } = response.data as User;
    dispatch(slice.actions.loadUserData({ avatar_url, bio, login, public_repos }));
  }
  catch(err){
    console.log(err);
  }

};

export const logoutUser = (): AppThunk => async (dispatch) => {

  try{

    localStorage.removeItem("token");
    dispatch(setRedirect({path: "/profile", message: "¡Come back soon!", success: true}));
    dispatch(slice.actions.unloadUserData());
  }
  catch(err){
    console.log(err);
  }

};

export default slice;
