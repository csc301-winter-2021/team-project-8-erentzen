import { combineReducers } from 'redux';

import { items } from './items.reducer';

const rootReducer = combineReducers({
    items,
});

export default rootReducer;