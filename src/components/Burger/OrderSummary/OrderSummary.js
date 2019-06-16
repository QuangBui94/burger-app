import React from 'react';

import Aux from 'react-aux';
import Button from '../../../UI/Button/Button';
import styles from './OrderSummary.module.css';

const INGREDIENT_PRICES = {
    meat: 1.3,
    cheese: 0.5, 
    salad: 0.6,
    bacon: 0.8
}

const OrderSummary = (props) => {
    let orderSum = null;
    if (props.ingredients) {
        orderSum = 
        (<table>
            <tbody style={{width: '100%', display: 'block'}}>
                <tr>
                    <th>QTY</th>
                    <th>ITEM</th>
                    <th>PRICE $</th>
                </tr>
                {Object.keys(props.ingredients).map(el => {
                    return (
                        <tr key={el}>
                            <td>{props.ingredients[el]}x</td>   
                            <td style={{textTransform: "capitalize"}}>{el}</td> 
                            <td>{(INGREDIENT_PRICES[el] * props.ingredients[el]).toFixed(2)}</td> 
                        </tr>
                    )       
                })}
            </tbody>    
        </table>)
    }

    return (
        <Aux>
            <div className={styles.section}>
                <h3>Your Order</h3>
                <p>The delicious burger with these ingredients:</p>
            </div>
            <div className={styles.section}>
                <ul className={styles.OrderSummary}>
                    {orderSum}
                </ul>
            </div>
            <div className={styles.section}>
                <p><strong>Total Price: {props.price}$</strong></p>
                <Button click={props.orderCancelled} btnType="Danger">Cancel</Button>
                <Button click={props.orderContinued} btnType="Success">Continue</Button>
            </div>
        </Aux>  
    )    
}

export default OrderSummary;