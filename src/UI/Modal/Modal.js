import React from 'react';
import Aux from 'react-aux';
import CSSTransition from 'react-transition-group/CSSTransition';

import styles from './Modal.module.css';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../Backdrop/Backdrop';
import Spinner from '../Spinner/Spinner';

const Modal = (props) => {
    let orderSummary = <OrderSummary 
    ingredients={props.ingredients} 
    modalClosed={props.modalClosed}
    orderCancelled={props.orderCancelled}
    orderContinued={props.orderContinued}
    price={props.price}/>

    if (props.showSpinner) {
        orderSummary = <Spinner show/>
    }

    const animationTiming = {
        enter: 300,
        exit: 300
    }

    return (
        <Aux>
            <Backdrop order={props.order} modalClosed={props.modalClosed}></Backdrop>
            <CSSTransition
                        mountOnEnter
                        unmountOnExit
                        in={props.order}
                        timeout={animationTiming} 
                        classNames={{
                            enter: '',
                            enterActive: styles.ModalOpen,
                            exit: '',
                            exitActive: styles.ModalClose
                        }}>
                        <div className={styles.Modal}>
                            {orderSummary}
                        </div>  
            </CSSTransition>  
        </Aux>
    )
};  

export default Modal;