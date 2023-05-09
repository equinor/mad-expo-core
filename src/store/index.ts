// src/store/index.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers';

const middleware = applyMiddleware(/* add your middleware here, e.g., thunk */);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['departmentId'], // Add other state keys you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, middleware);

const persistor = persistStore(store);

export { store, persistor };
