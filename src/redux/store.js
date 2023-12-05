import {configureStore} from '@reduxjs/toolkit';
import rootReducers from './rootReducer.js';

const store = configureStore({
  reducer:rootReducers,

});


export default store;

