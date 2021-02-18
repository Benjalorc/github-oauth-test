import React from 'react';
import loadable from '@loadable/component';

import { Provider } from "react-redux";
import { store, useSelector } from "./redux/store/index";

import {
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import RedirectGuard from 'components/RedirectGuard';

import UserLayout from './layouts/UserLayout';

import LoadingBackdrop from 'components/LoadingBackdrop';


const fallback = {fallback: (<LoadingBackdrop />)}

const Home = loadable(() => import(/* webpackChunkName: "homepage" */ "./pages"),fallback);
const Login = loadable(() => import(/* webpackChunkName: "login" */ "./pages/login"),fallback);
const Authorizing = loadable(() => import(/* webpackChunkName: "authorizing" */ "./pages/authorizing"),fallback);
const ProfileResume = loadable(() => import(/* webpackChunkName: "profileresume" */ "./pages/profile"),fallback);

const NoMatch = () => {
  let location = useLocation();

  return (
    <p>Not found {location.pathname}</p>
  );
}

const PrivateRoute = ({ children, ...rest }) => {

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {

  return (
    <Provider store={store}>
      <RedirectGuard />
      <Switch>
        <Route exact path="/">
          <Home />
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/authorizing">
          <Authorizing />
        </Route>
        <PrivateRoute exact path="/profile">
          <UserLayout>
            <ProfileResume />
          </UserLayout>
        </PrivateRoute>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
