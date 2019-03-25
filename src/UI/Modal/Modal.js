import React from 'react';
import Aux from 'react-aux';

import styles from './Modal.module.css';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../Backdrop/Backdrop';
import Spinner from '../Spinner/Spinner';

const Modal = (props) => {
    let classes = null;

    if (props.order) {
        classes = styles.Modal;
    } else {
        classes = styles.hideModal;
    }

    let orderSummary = <OrderSummary 
    ingredients={props.ingredients} 
    modalClosed={props.modalClosed}
    orderCancelled={props.orderCancelled}
    orderContinued={props.orderContinued}
    price={props.price}/>

    if (props.showSpinner) {
        orderSummary = <Spinner show/>
    }

    return (
        <Aux>
            <Backdrop order={props.order} modalClosed={props.modalClosed}></Backdrop>
            <div className={classes}>
                {orderSummary} 
            </div>
        </Aux>
    )
};  

export default Modal;