import * as actionTypes from '../actions/actionTypes';
import { objectUpdated } from '../../shared/utility';

const initialState = {
    orders: [],
    spinner: false,
    error: null,
    willPurchase: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SUCCESS:
            return objectUpdated(state, {orders: state.orders.concat({...action.orderData, id: action.orderId})});
        case actionTypes.ORDER_FAILED:
            return objectUpdated(state, {spinner: false});
        case actionTypes.ORDER_START:
            return objectUpdated(state, {spinner: true});
        case actionTypes.SHOW_ORDER_START:
            return objectUpdated(state, {spinner: true})
        case actionTypes.SHOW_ORDER_SUCCESS:
            return objectUpdated(state, {orders: action.orders, spinner: false});
        case actionTypes.SHOW_ORDER_FAILED:
            return objectUpdated(state, {spinner: false});
        case actionTypes.DELETE_ORDER_ITEM_SUCCESS:
            return objectUpdated(state, {orders: action.orders});
        case actionTypes.DELETE_ORDER_ITEM_FAILED:
            return objectUpdated(state, {spinner: false, error: action.error});
        case actionTypes.PURCHASE_INIT:
            return objectUpdated(state, {willPurchase: true, purchased: false, spinner: false})
        case actionTypes.PURCHASED_ORDER_HANDLER:
            return objectUpdated(state, {purchased: true, willPurchase: false, spinner: false})
        default:
            return state;
    }
}

export default reducer;