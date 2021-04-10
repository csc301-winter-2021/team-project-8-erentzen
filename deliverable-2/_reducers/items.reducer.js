import {itemConstants} from '../_constants'

const initialState = {
    items: [],
    orders: [],
}

function items(state = initialState, action) {
    switch (action.type) {
        case itemConstants.FETCH_REQUEST:
            return {
                loading: true
            };
        case itemConstants.FETCH_SUCCESS:
            return {
                items: action.items,
                orders: state.orders
            };
        case itemConstants.FETCH_FAILURE:
            return {
                error: action.error
            };
        case itemConstants.FETCH_ORDER_SUCCESS:
            return {
                items: state.items,
                orders: action.orders,
            };
        default:
            return state
        }
}


export {items};