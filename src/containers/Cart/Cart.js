import React, { Component } from 'react';
import axios from '../../axios-order';
import { connect } from 'react-redux';

import styles from './Cart.module.css';
import Order from '../../components/CheckoutSummary/Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import * as actionsCreator from '../../store/actions/index';
import Button from '../../UI/Button/Button';
import ContactData from '../ContactData/ContactData';
import Aux from 'react-aux';

class Cart extends Component {
    state = {
        orders: [],
        goForm: false
    }

    removeOrderHandler = (id, token) => {
        this.props.removeSingleOrder(id, token)
        
    }

    removeOrderListHandler = (token) => {
        this.props.removeOrderList()
        this.setState({orders: null});
        axios.delete('/orders.json?auth=' + token, { crossdomain: true })
                    .then(response => {
                console.log(response)
            });
    }

    componentDidMount () {
        console.log('a')
        this.props.showOrderPage(this.props.token);
    }

    render() {
        let order = <div style={{textAlign: 'center'}}><h1>Please sign in to order your delicious burger</h1></div>;
        if (this.props.spinner) {
            order = <Spinner show/>;
        } else {
            if (this.props.cart !== null) {
                order = (
                    <div className={styles.itemCart}>
                        <h1>Shopping cart</h1>
                        <div style={{borderBottom: '1px solid #ccc', marginTop: '60px', fontSize: '1.2rem', fontWeight: 'bold', color: '#777'}}>
                            <ul>
                                <li>Item</li>
                                <li>Description</li>
                                {/* <li>Ref No</li> */}
                                <li>Units</li>
                                <li>Price</li>
                                {/* <li>Delete</li> */}
                            </ul>
                        </div>
                        {this.props.cart.map((el, index) => {
                            console.log(el.id);
                            return (
                            <Order 
                                key={el.id}
                                price={+el.totalPrice}
                                ingredients={el.ingredients}
                                amount={el.amount}
                                id={el.id}
                                remove={() => this.removeOrderHandler(el.id, this.props.token)}
                                removeAll={() => this.removeOrderListHandler(this.props.token)}/>
                            )
                        })
                        }
                    </div>
                )
            }
        }
        let contactData = null;

        if (this.state.goForm) {
            contactData = <ContactData click={() => {this.setState({goForm: false})}} order={this.state.goForm} />
        }

        let billPrice = null
        if (this.props.cart) {
            billPrice = this.props.cart.map(el => {
                return el.totalPrice;
            })
            .reduce((acc, cur) => {
                return acc + cur;
            }, 0)
        }

        let cart = <Spinner show />
        if (this.props.cart) {
            if(this.props.cart.length !== 0) {
                cart = <div className={styles.Cart}>
            {order}
            <table className={styles.table} style={{width: '65%'}}>
                <tbody>
                    <tr>
                        <td>Total Item:</td>
                        <td>{billPrice.toFixed(2)} €</td>
                    </tr>
                    <tr>
                        <td>Shipping cost:</td>
                        <td>0 €</td>
                    </tr>
                    <tr>
                        <td><h2>Total:</h2></td>
                        <td><h2>{billPrice.toFixed(2)} €</h2></td>
                    </tr>
                    <tr>
                        <td><Button btnType='Danger' click={() => {this.props.history.push('/')}}>
                        Continue Shopping</Button></td>
                        <td><Button btnType='Success' click={() => {this.setState({goForm: true})}}>
                        Go to Payment</Button></td>
                    </tr>
                </tbody>   
            </table> 
        </div>
            } else {
                cart = (
                    <div style={{textAlign: 'center'}}>
                        <div style={{fontWeight: 'bold', fontSize: '3rem', color: 'grey', marginBottom: '1rem'}}>Please buy your first burger!</div>
                        <Button btnType="Success" click={() => {this.props.history.push('/')}}>Go to Home</Button>
                    </div>
                )
            }
            
        }

        return (
            <Aux>
                {cart}
                {contactData}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.order.cart,
        spinner: state.order.spinner,
        token: state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showOrderPage: (token) => dispatch(actionsCreator.showCart(token)),
        removeSingleOrder: (id) => dispatch(actionsCreator.removeSingleOrder(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);