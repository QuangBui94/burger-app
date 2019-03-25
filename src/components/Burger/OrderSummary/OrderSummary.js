import React from 'react';

import Aux from 'react-aux';
import Button from '../../../UI/Button/Button';

const OrderSummary = (props) => {
    let orderSum = null;

    if (props.ingredients) {
        orderSum = Object.keys(props.ingredients)
        .map(el => {
            return (
                <li key={el}>
                    <span style={{textTransform: "capitalize"}}>{el}</span>: {props.ingredients[el]}
                </li>
            )
        });
    }

    return (
        <Aux>
        <h3>Your Order</h3>
        <p>The delicious burger with following ingredients:</p>
        <ul>
            {orderSum}
        </ul>
        <p><strong>Total Price: {props.price}$</strong></p>
        <Button click={props.orderCancelled} btnType="Danger">Cancel</Button>
        <Button click={props.orderContinued} btnType="Success">Continue</Button>
    </Aux>  
    )    
}

export default OrderSummary;