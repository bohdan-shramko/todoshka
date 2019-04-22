import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import { i18nState } from 'redux-i18n';

export default combineReducers({
    i18nState,
    items: itemsReducer
});