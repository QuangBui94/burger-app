import React, { Component } from 'react';
import Aux from 'react-aux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Modal from '../../UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';
import * as actionsCreator from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        showOrder: false,
        spinner: false,
    }

    componentDidMount () {
        this.props.setIngredient()
    }

    orderContinueHandler = () => {
        this.props.purchaseInit()
    }

    orderCancelHandler = () => {
        this.setState({showOrder: false})
    }

    orderHandler = () => {
        if (this.props.isAuth){
            this.setState({showOrder: true});
        } else {
            this.props.history.push('/auth');
        }
    }
      
    purchasableHandler = (ingredient) => {
        // console.log(ingredient);
        let sumIngr = Object.values(ingredient).reduce((acc, cur) => {
            return acc + cur;
        }, 0);
        return sumIngr <= 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? <div style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>The ingredients cannot be loaded</div> :<Spinner show/>;
        if (this.props.ingredients) {
            burger = <Burger ingredient={this.props.ingredients}/>
        }
        let burgerBuilder = null;
        if (!this.props.purchased) {
            burgerBuilder = this.props.willPurchase ? <Redirect to="/checkout" /> : null;
        }
        return (
            <Aux>
                {burgerBuilder}
                <Modal 
                    ingredients={this.props.ingredient} 
                    order={this.state.showOrder}
                    modalClosed={this.orderCancelHandler}
                    orderCancelled={this.orderCancelHandler}
                    orderContinued={this.orderContinueHandler}
                    price={this.props.totalPrice.toFixed(2)}
                    showSpinner={this.state.spinner}/>
                {burger}      
                <BuildControls 
                    increase={(ingreName) => this.props.increaseIngreHandler(ingreName)} 
                    decrease={(ingreName) => this.props.decreaseIngreHandler(ingreName)}
                    disabled={disabledInfo}
                    price={this.props.totalPrice.toFixed(2)} 
                    disabledBtn={this.props.purchaseStatus}
                    order={this.orderHandler}
                    isAuth={this.props.isAuth}/>             
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.price,
        purchaseStatus: state.burgerBuilder.purchaseStatus,
        error: state.burgerBuilder.error,
        willPurchase: state.order.willPurchase,
        purchased: state.order.purchased,
        isAuth: state.auth.tokenId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        increaseIngreHandler: (ingreName) => dispatch(actionsCreator.addIngredient(ingreName)),
        decreaseIngreHandler: (ingreName) => dispatch(actionsCreator.removeIngredient(ingreName)),
        // purchasingStatusHandler: () => dispatch({type: actionTypes.PURCHASE_STATUS}),
        setIngredient: () => dispatch(actionsCreator.fetchIngredient()),
        purchaseInit: () => dispatch(actionsCreator.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));