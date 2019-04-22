import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {};
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['i18nState']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(
  persistedReducer, 
  initialState, 
  applyMiddleware(...middleware)
);
let persistor = persistStore(store);

export { store, persistor };