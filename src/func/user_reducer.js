/* User status handler */
import { combineReducers } from 'redux';
import Settings from '../settings.js';

const INITIAL_STATE = {
  is_loading: false,
  is_logged_in: false,
  user: {
    uid: 0,
    name: 'Anonymous',
    auth_token: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOG_IN':
      console.log('User has logged in!');
      //console.log(Drupal.user);
      return Object.assign({}, state, {
        is_logged_in: true,
        user: action.payload,
      });

    case 'LOG_OUT':
      console.log('User has logged out!');
      return Object.assign({}, state, {
        is_logged_in: false,
        user: {
          uid: 0,
          name: 'Anonymous',
          auth_token: '',
        },
      });

    default:
      return state
  }
};

export default combineReducers({
  userStatus: userReducer
});
