import {itemConstants} from '../_constants'

export function items(state = {}, action) {
    switch (action.type) {
        case itemConstants.FETCH_REQUEST:
            return {
                loading: true
            };
        case itemConstants.FETCH_SUCCESS:
            return {
                items: action.items
            };
        case itemConstants.FETCH_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
        }
}