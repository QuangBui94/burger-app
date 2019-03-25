import React from 'react';
import { connect } from 'react-redux';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const control = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
]

const BuildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Price: <strong>{props.price}$</strong></p>
        {
            control.map(el => {
                return <BuildControl 
                key={el.label} 
                label={el.label} 
                decrease={() => props.decrease(el.type)} 
                increase={() => props.increase(el.type)}
                disabled={props.disabled[el.type]}/>
            })
        }
        <button className={styles.OrderButton} disabled={props.disabledBtn} onClick={props.order}>{props.isAuth ? 'Order now' : 'Sign in to Order'}</button>
    </div>
)

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.tokenId
    }
}

export default connect(mapStateToProps)(BuildControls);