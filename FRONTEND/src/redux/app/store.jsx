import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/UserSlice';
import adminReducer from '../feature/AdminSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});
export default store;