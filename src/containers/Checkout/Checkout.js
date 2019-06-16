import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import styles from './Checkout.module.css';
import * as actionsCreator from '../../store/actions/index';


class Checkout extends Component {
    // state = {
    //     cartUpdated: false
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('should');
    //     return nextState.cartUpdated !== this.state.cartUpdated;
    // } 

    // componentWillUpdate = () => {
    //     console.log('WILL');
    //     this.props.showOrderPage(this.props.token);
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('did');
    //     if (prevState.updateCart !== this.state.updateCart) {
    //         this.props.showOrderPage(this.props.token);
    //         this.forceUpdate();
    //     }
    // }

    // updateCart = (cart) => {
    //     this.setState({cartUpdated: true});
    //     this.props.addCartHandler(this.props.token, cart);
    //     this.props.showOrderPage(this.props.token);
    // }

    addCartHandler = (token, cart) => {
        this.props.addCartHandler(token, cart);
    }

    goCartHandler = () => {
        this.props.history.push('/orders');
    }

    orderCancelledHandler = () => {
        this.props.history.push('/')
    }


    render() {
        let summary = <Redirect to="/"/>
        let cart = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            userId: this.props.userId,
            totalPrice: this.props.price
        }
        if (this.props.price !== 4) {
            summary = 
            <CheckoutSummary 
            ingredients={this.props.ingredients} 
            cancel={this.orderCancelledHandler}
            continue={() => this.addCartHandler(this.props.token, cart)}
            goCartHandler={this.goCartHandler}
            // isCartEmpty={this.props.cart === null ? true : this.props.cart.length == 0 ? true : false}
            />
        }
        return (
            <div className={styles.Checkout}>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.order.cart,
        token: state.auth.tokenId,
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showOrderPage: (token) => dispatch(actionsCreator.showCart(token)),
        addCartHandler: (token, cart) => dispatch(actionsCreator.addCart(token, cart))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);