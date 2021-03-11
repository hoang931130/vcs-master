/* Redux store */
import { createStore } from 'redux';
import userReducer from './user_reducer';
const store = createStore(userReducer);

export default store;
