export const RECEIVE_USERS = 'RECEIVE_USERS';
export const CREATE_USER = 'CREATE_USER';

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

export const createUser = (user) => {
  return {
    type: CREATE_USER,
    user
  };
};