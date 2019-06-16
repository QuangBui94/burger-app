import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
                <h1>We hope it taste well</h1>
                <Burger ingredient={props.ingredients}/>
                <Button btnType="Danger" click={props.cancel}>Cancel</Button>
                <Button btnType="Success" click={props.continue}>Add to cart</Button>
                <Button btnType="Success" click={props.goCartHandler} disabled={props.isCartEmpty}>See shoping cart</Button>
            </div>
    )
}

export default CheckoutSummary;