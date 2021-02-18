import { combineReducers } from 'redux';

import { reducer as auth } from '../slices/auth';
import { reducer as redirect } from '../slices/redirect';

const rootReducer = combineReducers({
	auth,
	redirect
});

export default rootReducer;