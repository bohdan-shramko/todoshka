import {
    ADD_ITEM, 
    SHOW_ITEM, 
    ADD_COMMENT,
    DELETE_ITEM
} from './types';

export const showItem = item => dispatch => {
    dispatch({
        type: SHOW_ITEM,
        payload: item
    });
}

export const addItem = newItemContent => dispatch => {
    dispatch({
        type: ADD_ITEM,
        payload: newItemContent
    });
}

export const addNewComment = comment => dispatch => {
    dispatch({
        type: ADD_COMMENT,
        payload: comment
    });
}

export const deleteItem = itemId => dispatch => {
    dispatch({
        type: DELETE_ITEM,
        payload: itemId
    });
}
