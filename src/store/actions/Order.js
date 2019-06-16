import axios from '.././../axios-order';
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
        axios.post('/orders.json?auth=' + token, order)
        .then((res) => {
            dispatch(orderSuccess(res.data.name, order))
        })
        .catch((error) => {
            dispatch(orderFailed(error))
        });
    }
}

const showCartSuccess = (res, userId) => {
    let fetchedCart = []
    for ( let cart in res.data) {
        // if (res.data[order].userId === userId) {
            fetchedCart.push({
                ...res.data[cart],
                id: cart,
                amount: 1
            })
        // };  
    }
    return {
        type: actionTypes.SHOW_CART_SUCCESS,
        cart: fetchedCart
    }
}

export const showCartFailed = () => {
    return {
        type: actionTypes.SHOW_CART_FAILED
    }
}

export const showCartStart = () => {
    return {
        type: actionTypes.SHOW_CART_START
    }
}

export const showCart = (token) => {
    const userId = localStorage.getItem('userId');
    return dispatch => {
        dispatch(showCartStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/cart.json' + queryParams)
            .then(res => {
                console.log(res)
                dispatch(showCartSuccess(res))
            })
            .catch(error => {
                dispatch(showCartFailed(error))
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

export const removeSingleOrder = (id, token) => {
    return dispatch => {
        axios.delete('/orders/' + id +'?auth=' + token, { crossdomain: true, mode: 'no-cors' })
            .then(response => {
                dispatch(deleteOrderItemSuccess(id))
            })
            .catch(error => {
                dispatch(deleteOrderItemFailed(error))
            });
    }
}

export const purchasedOrderHandler = (dataForm) => {
    return {
        type: actionTypes.PURCHASED_ORDER_HANDLER,
        dataForm: dataForm
    }
}

export const addCartInit = () => {
    return {
        type: actionTypes.ADD_CART_INIT
    }
}

export const addCartSuccess = () => {
    return {
        type: actionTypes.ADD_CART_SUCCESS
    }
}

export const addCartFail = (err) => {
    return {
        type: actionTypes.ADD_CART_FAIL,
        err: err
    }
}

export const addCart = (token, cart) => {
    return dispatch => {
        dispatch(addCartInit())
        axios.post('/cart.json?auth=' + token, cart)
        .then((res) => {
            console.log(res);
            dispatch(addCartSuccess(res))
        })
        .catch((error) => {
            dispatch(addCartFail(error))
        });
    }
}

export const addItemCart = (idItem) => {
    return {
        type: actionTypes.ADD_ITEM_CART,
        idItem: idItem
    }
}

export const removeItemCart = (idItem) => {
    return {
        type: actionTypes.REMOVE_ITEM_CART,
        idItem: idItem
    }
}

export const showOrderSuccess = (res, userId) => {
    let fetchedOrder = []
    for ( let order in res.data) {
        // if (res.data[order].userId === userId) {
            fetchedOrder.push({
                ...res.data[order],
                id: order,
            })
        // };  
    }
    return {
        type: actionTypes.SHOW_ORDER_SUCCESS,
        orders: fetchedOrder
    }
}

export const showOrderInit = () => {
    return {
        type: actionTypes.SHOW_ORDER_INIT
    }
}

export const showOrderFail = (err) => {
    return {
        type: actionTypes.SHOW_ORDER_FAIL,
        err: err
    }
}

export const showOrder = (token) => {
    const userId = localStorage.getItem('userId')
    return dispatch => {
        dispatch(showOrderInit());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(res => {
            dispatch(showOrderSuccess(res))
        })
        .catch(err => {
            dispatch(showOrderFail(err))
        })
    }
}

// export const showCart = (token) => {
//     const userId = localStorage.getItem('userId');
//     return dispatch => {
//         dispatch(showCartStart())
//         const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
//         axios.get('/cart.json' + queryParams)
//             .then(res => {
//                 console.log(res)
//                 dispatch(showCartSuccess(res))
//             })
//             .catch(error => {
//                 dispatch(showCartFailed(error))
//             })
//     }
// }


// export const addCartSuccess = () => {
//     const userId = localStorage.getItem('userId');
//     const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
//     axios.get('/cart.json' + queryParams)
//         .then(res => {
//             console.log(res)
//             dispatch(showCartSuccess(res))
//         })
//         .catch(error => {
//             dispatch(showCartFailed(error))
//         })
    
//     return {
//         type: actionTypes.ADD_CART_SUCCESS
//     }
// }

// export const addCartFail = (err) => {
//     return {
//         type: actionTypes.ADD_CART_FAIL,
//         err: err
//     }
// }

// export const addCart = (token, cart) => {
//     return dispatch => {
//         dispatch(addCartInit())
//         axios.post('/cart.json?auth=' + token, cart)
//         .then((res) => {
//             console.log(res);
//             dispatch(addCartSuccess(res))
//         })
//         .catch((error) => {
//             dispatch(addCartFail(error))
//         });
//     }
// }

// const showCartSuccess = (res, userId) => {
//     let fetchedCart = []
//     for ( let cart in res.data) {
//         // if (res.data[order].userId === userId) {
//             fetchedCart.push({
//                 ...res.data[cart],
//                 id: cart,
//                 amount: 1
//             })
//         // };  
//     }
//     return {
//         type: actionTypes.SHOW_CART_SUCCESS,
//         cart: fetchedCart
//     }
// }

// export const showCartFailed = () => {
//     return {
//         type: actionTypes.SHOW_CART_FAILED
//     }
// }

// export const showCartStart = () => {
//     return {
//         type: actionTypes.SHOW_CART_START
//     }
// }

// export const showCart = (token) => {
//     const userId = localStorage.getItem('userId');
//     return dispatch => {
//         dispatch(showCartStart())
//         const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
//         axios.get('/cart.json' + queryParams)
//             .then(res => {
//                 console.log(res)
//                 dispatch(showCartSuccess(res))
//             })
//             .catch(error => {
//                 dispatch(showCartFailed(error))
//             })
//     }
// }
