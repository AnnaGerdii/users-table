import { getUsersFromServer } from '../api/api';

export const START_LOADING = 'START_LOADING';
export const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
export const HANDLE_ERROR = 'HANDLE_ERROR';

export const startLoading = () => ({ type: START_LOADING });
export const handleError = () => ({ type: HANDLE_ERROR });

export const handleSuccess = users => ({
  type: HANDLE_SUCCESS,
  users,
});

export const loadUsers = () => async(dispatch) => {
  dispatch(startLoading());

  try {
    const usersFromServer = await getUsersFromServer();

    dispatch(handleSuccess(usersFromServer));
  } catch {
    dispatch(handleError());
  }
};
