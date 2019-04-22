import {
    ADD_ITEM, 
    SHOW_ITEM, 
    ADD_COMMENT,
    DELETE_ITEM
} from '../actions/types';

const initialState = {
    items: [],
    item: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SHOW_ITEM:
            return {
                ...state,
                item: action.payload
            }
        
        case ADD_ITEM:
            let newItem = {
                id: state.items.length > 0 
                    ? state.items[state.items.length - 1].id + 1 
                    : 1,
                content: action.payload,
                comments: []
            }
            return {
                item: newItem,
                items: state.items.concat([newItem])
            }

        case ADD_COMMENT:
            let items = state.items;
            let targetItem = state.item;
            
            items.map(item => {
                if (item.id === targetItem.id) {
                    item.comments.push({content: action.payload});
                    targetItem = item;
                } 
            });

            return {
               item: Object.assign({}, targetItem),
               items: [].concat(items), 
            }

        case DELETE_ITEM:
            return {
                item: state.item 
                      ? state.item.id === action.payload ? null : state.item
                      : state.item,
                items: state.items.filter(item => item.id !== action.payload), 
            }

        default:
            return state;
    }
}