import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loadingReducer from './loading';
import errorReducer from './loadingError';
import usersReducer from './users';

export const getIsLoading = state => state.isLoading;
export const getLoadingError = state => state.loadingError;
export const getUsers = state => state.users;
export const getUsersCount = state => getUsers(state).length;

const initialState = {
  users: [],
  isLoading: false,
  loadingError: false,
};

const rootReducer = combineReducers({
  users: usersReducer,
  isLoading: loadingReducer,
  loadingError: errorReducer,
});

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
