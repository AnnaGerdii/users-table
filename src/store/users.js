import { HANDLE_SUCCESS } from './actions';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case HANDLE_SUCCESS:
      return action.users;

    default:
      return state;
  }
};

export default usersReducer;
