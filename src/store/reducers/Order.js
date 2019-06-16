import * as actionTypes from '../actions/actionTypes';
import { objectUpdated } from '../../shared/utility';

const initialState = {
    orders: [],
    spinner: false,
    error: null,
    willPurchase: false,
    purchased: false,
    cancelPurchase: false,
    dataForm: null,
    cart: null
}

export const addItemCartHandler = (state, action) => {
    let identifierItem = state.cart.find(el => {
        if (el.id === action.idItem) {
            return el;
        } 
        return el;
    })
    let updatedIdentifierItem = objectUpdated(identifierItem, {amount: identifierItem.amount + 1, totalPrice: identifierItem.totalPrice + identifierItem.price})

    let updateCart = state.cart.map(el => {
        if (el.id === action.idItem) {
            return updatedIdentifierItem;
        } 
        return updatedIdentifierItem;
    });
    return objectUpdated(state, {cart: updateCart});
}

export const removeItemCartHandler = (state, action) => {
    let identifierItem = state.cart.find(el => {
        if (el.id === action.idItem) {
            return el;
        }
        return el;
    });
    let updatedIdentifierItem = objectUpdated(identifierItem, {amount: identifierItem.amount - 1, totalPrice: identifierItem.totalPrice - identifierItem.price})
    let updateCart = state.cart.map(el => {
        if (el.id === action.idItem) {
            return updatedIdentifierItem;
        } 
        return updatedIdentifierItem;
    });
    return objectUpdated(state, {cart: updateCart});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SUCCESS:
            return objectUpdated(state, {orders: state.orders.concat({...action.orderData, id: action.orderId})});
        case actionTypes.ORDER_FAILED:
            return objectUpdated(state, {spinner: false});
        case actionTypes.ORDER_START:
            return objectUpdated(state, {spinner: true});
        case actionTypes.SHOW_CART_START:
            return objectUpdated(state, {spinner: true})
        case actionTypes.SHOW_CART_SUCCESS:
            return objectUpdated(state, {cart: action.cart, spinner: false});
        case actionTypes.SHOW_CART_FAILED:
            return objectUpdated(state, {spinner: false});
        case actionTypes.DELETE_ORDER_ITEM_SUCCESS:
            return objectUpdated(state, {orders: action.orders});
        case actionTypes.DELETE_ORDER_ITEM_FAILED:
            return objectUpdated(state, {spinner: false, error: action.error});
        // case actionTypes.PURCHASE_INIT:
        //     return objectUpdated(state, {willPurchase: true, purchased: false, spinner: false})
        case actionTypes.PURCHASED_ORDER_HANDLER:
            return objectUpdated(state, {purchased: false, willPurchase: false, spinner: false, dataForm: action.dataForm})
        case actionTypes.ADD_CART_INIT:
            return objectUpdated(state, {spinner: true});
        case actionTypes.ADD_CART_SUCCESS: 
            return objectUpdated(state, {spinner: false})
        case actionTypes.ADD_CART_FAIL:
            return objectUpdated(state, {spinner: false, error: action.err})
        case actionTypes.ADD_ITEM_CART:
            return addItemCartHandler(state, action)
        case actionTypes.REMOVE_ITEM_CART:
            return removeItemCartHandler(state, action)
        case actionTypes.SHOW_ORDER_INIT:
            return objectUpdated(state, {spinner: true})
        case actionTypes.SHOW_ORDER_SUCCESS:
            return objectUpdated(state, {spinner: false, orders: action.orders})
        case actionTypes.SHOW_ORDER_FAIL:
            return objectUpdated(state, {spinner: false, error: action.err})
        default:
            return state;
    }
}

export default reducer;