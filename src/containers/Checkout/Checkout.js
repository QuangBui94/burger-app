import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import styles from './Checkout.module.css';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
    orderCancelledHandler = () => {
        this.props.history.push('/')
    }

    orderContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to="/"/>
        if (this.props.ingredients) {
            summary = this.props.purchased ? <Redirect to="/" /> : 
            <CheckoutSummary 
            ingredients={this.props.ingredients} 
            cancel={this.orderCancelledHandler}
            continue={this.orderContinueHandler}/>
        }
        return (
            <div className={styles.Checkout}>
                {summary}
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);