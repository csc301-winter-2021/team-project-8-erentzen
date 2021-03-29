import { combineReducers } from 'redux';

import { items, orders } from './items.reducer';

const rootReducer = combineReducers({
    items,
    orders
});

export default rootReducer;