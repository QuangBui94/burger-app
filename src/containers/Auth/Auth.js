import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from 'react-aux';
import { Redirect, withRouter } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import styles from './Auth.module.css';
import { objectUpdated, validationHandler } from '../../shared/utility';
import * as actionsCreator from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                label: 'Password:',
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isFormValid: false,
        isSignup: false
    }

    errorMessageHandler = () => {
        alert(this.props.message);
        this.props.resetErrorMessage();
    }

    authModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    inputChangedHandler = (event, controlIdentifier) => {
        let updatedCtrlIdentifier = objectUpdated(this.state.controls[controlIdentifier], {
            value: event.target.value,
            touched: true,
            valid: validationHandler(event.target.value, this.state.controls[controlIdentifier].validation)
        })

        let updatedControls = objectUpdated(this.state.controls, {
            [controlIdentifier]: updatedCtrlIdentifier
        })

        let isFormValid = true;
        Object.values(updatedControls).map(el => {
            return isFormValid = el.valid && isFormValid
        })
        this.setState({controls: updatedControls, isFormValid: isFormValid});
    }

    render() {
        let form = Object.entries(this.state.controls).map(el => {
            return (
                <Input 
                    key={el[0]}
                    elementtype={el[1].elementType}
                    elementconfig={el[1].elementConfig}
                    value={el[1].value}
                    label={el[1].label}
                    invalid={!el[1].valid}
                    touched={el[1].touched}
                    changed={(event) => {this.inputChangedHandler(event, el[0])}}/>
            )
        })

        if (this.props.message) {
            this.errorMessageHandler()
        }

        let authForm = 
                <div className={styles.Auth}>
                    <form onSubmit={this.submitHandler}>
                        <h1>Sign in</h1>
                        {form}
                        <Button btnType="Submit" disabled={!this.state.isFormValid}>SUBMIT</Button>
                    </form>
                    <p className={styles.pElement}>New to Burger App ?</p>
                    <Button btnType="Switch" click={() => this.authModeHandler(this.state.isSignup)}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button> 
                </div>  

        if (this.props.spinner) {
            authForm = <Spinner show/>
                     
        }

        if (this.props.isAuthenticated && !this.props.purchaseStatus) {
            authForm = <Redirect to="/checkout"/>
        } else if (this.props.isAuthenticated && this.props.purchaseStatus) {
            authForm = <Redirect to="/"/>
        }

        return (
            <Aux>     
                {authForm}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchaseStatus: state.burgerBuilder.purchaseStatus,
        spinner: state.auth.spinner,
        error: state.auth.error,
        message: state.auth.message,
        isAuthenticated: state.auth.tokenId != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionsCreator.auth(email, password, isSignUp)),
        resetErrorMessage: () => dispatch(actionsCreator.resetErrorMessage())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));