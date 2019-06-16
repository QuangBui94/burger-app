import React, { Component } from 'react';
import styles from './OrderDetails.module.css';
import { connect } from 'react-redux';
import {} from 'react-router-dom';

import Button from '../../UI/Button/Button';
import * as actionsCreator from '../../store/actions/index';

class OrderDetails extends Component {
    componentDidMount () {
        this.props.showOrder(this.props.token);
    }

    render() {
        let OrderDetails = null; 
        let billPrice = null;      
    
        if (this.props.ingredients && this.props.order.length !== 0) {
            console.log(this.props.order)
            OrderDetails = 
            (
                <div className={styles.OrderSection}>
                    <table>
                        <tr>
                            <th>QTY</th>
                            <th>ITEM</th>
                            <th>PRICE $</th>
                        </tr>
                        {Object.keys(this.props.order[0].cart).map(el => {
                            return (
                                <tr key={this.props.order[0].cart[el].id}>
                                    <td>{this.props.order[0].cart[el].amount}x</td>   
                                    <td style={{textTransform: "capitalize"}}>{this.props.order[0].cart[el].id}</td> 
                                    <td>{this.props.order[0].cart[el].totalPrice.toFixed(2)}</td> 
                                </tr>
                            )          
                        })}
                    </table>
                </div>
            )
            billPrice = this.props.order[0].cart.map(el => {
                return el.totalPrice
            })
            .reduce((acc, cur) => {
                return acc + cur;
            }, 0)
        }

        let deliveryInfo = null;

        if (this.props.dataForm) {
            deliveryInfo = Object.keys(this.props.dataForm).map(el => {
                return (
                    <li key={el}>
                        <div style={{textTransform: 'capitalize'}} className={styles.elementDelivery}>{el}:</div>
                        <div className={styles.elementDelivery}>{this.props.dataForm[el]}</div>
                    </li>
                )
            })
        }

        return (
            <div className={styles.OrderDetails}>
                <div className={styles.OrderSection} style={{textAlign: 'center'}}><strong>Order Summary</strong></div>
                <div className={styles.OrderSection}><div style={{fontWeight: 'bold', color: 'grey', display: 'block', marginBottom: '30px'}}>Delivery Details</div>
                    {deliveryInfo}
                </div>
                <div className={styles.OrderSection}>
                    {OrderDetails}
                </div>
                <div className={styles.OrderSection}>
                    <span style={{marginRight: '20px'}}><strong>Total Price: {billPrice !== null ? billPrice.toFixed(2) : null}$</strong></span>
                    <span><Button btnType="Success" click={() => {this.props.history.push('/')}}>Go to Home</Button></span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        order: state.order.orders,
        dataForm: state.order.dataForm,
        token: state.auth.tokenId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showOrder: (token) => dispatch(actionsCreator.showOrder(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
