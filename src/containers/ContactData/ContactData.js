import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ContactData.module.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import * as actionCreators from '../../store/actions/index'
import { objectUpdated, validationHandler } from '../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                label: 'Your name:',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                label: 'Email:',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                label: 'Street:',
                value: '',
                validation: {
                    required: true,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            ZIP: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                label: 'ZIP Code:',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                label: 'Country:',
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', display: 'Fastest'},
                        {value: 'cheapest', display: 'Cheapest'}
                        ]
                },
                label: 'Delivery:',
                value: 'fastest',
                valid: true
            }
        },
        isFormValid: false
    }

    valueChangedHandler = (event, element) => {
        let updatedFormElement = objectUpdated(this.state.orderForm[element], {
            value: event.target.value,
            touched: true,
            valid: validationHandler(event.target.value, this.state.orderForm[element].validation)
        });
        let updatedOrderForm = objectUpdated(this.state.orderForm, {
            [element]: updatedFormElement
        })
       
        let isFormValid = true;
        for (updatedFormElement in updatedOrderForm) {
            isFormValid = updatedOrderForm[updatedFormElement].valid && isFormValid;
        }

        this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid});
    }

    orderHandler = (event) => {
        event.preventDefault();
        const dataForm = {};
        for (let elementIndentifier in this.state.orderForm) {
            dataForm[elementIndentifier] = this.state.orderForm[elementIndentifier].value;
        }
        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            orderForm: dataForm,
            userId: this.props.userId
        }

        this.props.orderBurger(order, this.props.token)
        this.props.purchasedOrderHandler()
        alert('Your order is completed');
    }

    render() {
        const input = Object.entries(this.state.orderForm).map(el => {
            return <Input 
                    key={el[0]}
                    elementtype={el[1].elementType} 
                    elementconfig={el[1].elementConfig}
                    label={el[1].label} 
                    value={el[1].value}
                    invalid={!el[1].valid}
                    touched={el[1].touched}
                    changed={(event) => this.valueChangedHandler(event, el[0])}/>
        })
        let form = 
        <form onSubmit={this.orderHandler}>
            <h4>Enter your contact data here</h4>
            {input}
            <Button btnType="Success" disabled={!this.state.isFormValid}>Order</Button>
        </form>
        
        if (this.props.spinner) {
            form = <Spinner show/>
        }
        return (
            <div className={styles.ContactData}>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        spinner: state.order.spinner,
        token: state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderBurger: (order, token) => dispatch(actionCreators.orderBurger(order, token)),
        purchasedOrderHandler: () => dispatch(actionCreators.purchasedOrderHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);