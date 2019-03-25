import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

export const orderSuccess = (id, order) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderData: order,
        orderId: id
    }
}

export const orderFailed = () => {
    return { 
        type: actionTypes.ORDER_FAILED,
    }
}

export const orderStart = () => {
    return {
        type: actionTypes.ORDER_START
    }
}

export const orderBurger = (order, token) => {
    return dispatch => {
        dispatch(orderStart())
        axios.post('./orders.json?auth=' + token, order)
        .then((res) => {
            dispatch(orderSuccess(res.data.name, order))
        })
        .catch((error) => {
            dispatch(orderFailed(error))
        });
    }
}

const showOrderSuccess = (res, userId) => {
    let fetchedOrder = []
    for ( let order in res.data) {
        // if (res.data[order].userId === userId) {
            fetchedOrder.push({
                ...res.data[order],
                id: order
            })
        // };  
    }
    return {
        type: actionTypes.SHOW_ORDER_SUCCESS,
        orders: fetchedOrder
    }
}

export const showOrderFailed = () => {
    return {
        type: actionTypes.SHOW_ORDER_FAILED
    }
}

export const showOrderStart = () => {
    return {
        type: actionTypes.SHOW_ORDER_START
    }
}

export const showOrder = (token) => {
    const userId = localStorage.getItem('userId');
    return dispatch => {
        dispatch(showOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                dispatch(showOrderSuccess(res))
            })
            .catch(error => {
                dispatch(showOrderFailed(error))
            })
    }
}

export const deleteOrderItemSuccess = (id) => {
    let updatedOrders = [...this.state.orders];
    updatedOrders.map((el, index) => {
        if (el.id === id) {
            updatedOrders.splice(index, 1);
        }
        return updatedOrders;
    });
    return {
        type: actionTypes.DELETE_ORDER_ITEM_SUCCESS,
        orders: updatedOrders
    };
}

export const deleteOrderItemFailed = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_ITEM_FAILED,
        error: error
    }
}

export const removeSingleOrder = (id) => {
    return dispatch => {
        axios.delete('/orders/' + id, { crossdomain: true })
            .then(response => {
                dispatch(deleteOrderItemSuccess(id))
            })
            .catch(error => {
                dispatch(deleteOrderItemFailed(error))
            });
    }
}

export const purchasedOrderHandler = () => {
    return {
        type: actionTypes.PURCHASED_ORDER_HANDLER
    }
}