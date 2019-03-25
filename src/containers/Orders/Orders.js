import React, { Component } from 'react';
import axios from '../../axios-order';
import { connect } from 'react-redux';

import styles from './Orders.module.css';
import Order from '../../components/CheckoutSummary/Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import * as actionsCreator from '../../store/actions/index';

class Orders extends Component {
    state = {
        orders: []
    }

    removeOrderHandler = (id) => {
        this.props.removeSingleOrder(id)
        
    }

    removeOrderListHandler = () => {
        this.props.removeOrderList()
        this.setState({orders: null});
        axios.delete('/orders', { crossdomain: true })
                    .then(response => {
                console.log(response)
            });
    }

    componentDidMount () {
        this.props.showOrderPage(this.props.token);
    }

    render() {
        let order = <div style={{textAlign: 'center'}}><h1>Please sign in to order your delicious burger</h1></div>;
        if (this.props.spinner) {
            order = <Spinner show/>;
        } else {
            if (this.props.orders.length !== 0) {
                order = this.props.orders.map(el => {
                    return (
                    <Order 
                        key={el.id}
                        price={+el.price}
                        ingredients={el}
                        remove={() => this.removeOrderHandler(el.id)}
                        removeAll={this.removeOrderListHandler}/>
                    )
                })
            }
        }
        return (
            <div className={styles.Orders}>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        spinner: state.order.spinner,
        token: state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showOrderPage: (token) => dispatch(actionsCreator.showOrder(token)),
        removeSingleOrder: (id) => dispatch(actionsCreator.removeSingleOrder(id)),
        removeOrderList: () => dispatch()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);