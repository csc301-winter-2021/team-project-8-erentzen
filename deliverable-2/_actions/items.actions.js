import {itemService} from '../_services';
import {itemConstants} from '../_constants';

export const itemActions = {
    fetchAll,
    updateInventory
};

function fetchAll() {
    return dispatch => {
        dispatch(request());
        itemService.fetchAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: itemConstants.FETCH_REQUEST } }
    function success(items) { return { type: itemConstants.FETCH_SUCCESS, items } }
    function failure(error) { return { type: itemConstants.FETCH_FAILURE, error } }
}

function updateInventory(id, count) {
    itemService.updateInventory(id, count)
}