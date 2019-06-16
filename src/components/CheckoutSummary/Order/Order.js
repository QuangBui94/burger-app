import React, { Component } from 'react';
import Aux from 'react-aux';
import { connect } from 'react-redux';

import styles from './Order.module.css';
// import Icon from '../../../UI/Icon/Icon';
import Burger from '../../Burger/Burger';
import * as actionsCreator from '../../../store/actions/index';

class Order extends Component {
    state = {
        ingredient: {}
    }

    componentDidMount () {
        let ingredientList = {}
        for (let ingredientName in this.props.ingredients) {
            ingredientList[ingredientName] = this.props.ingredients[ingredientName]
        }
        this.setState({ingredient: ingredientList});
    }

    render() {
        let ingredient = null;

        ingredient = Object.entries(this.state.ingredient).map(el => {
            return (
                    <div key={el[0]}>
                        <p style={{textTransform: 'capitalize', margin: '0.5rem auto'}}>{el[0]}: {el[1]}</p>
                    </div>
            )
        })
           
        return (
            <Aux>
                <div className={styles.Order}>
                    <ul>
                        <li><Burger order ingredient={this.state.ingredient}/></li>
                        <li>{ingredient}</li>
                        {/* <li><span>Ref</span></li> */}
                        <li>
                            <div style={{display: 'flex', flexFlow: 'row'}}>
                                {/* <span style={{color: 'grey'}}><Icon disabled={this.props.amount === 0} click={() => this.props.removeItemHandler(this.props.id)} class="arrow-back"/></span> */}
                                <span style={{margin: '0 12px', position: 'relative', top: '10px'}}>{this.props.amount}</span>
                                {/* <span style={{color: 'grey'}}><Icon click={() => this.props.addItemHandler(this.props.id)} class="arrow-forward"/></span> */}
                            </div>
                        </li>
                        <li><p>{this.props.price.toFixed(2)} €</p></li>
                        {/* <li><Button btnType="Danger" click={this.props.remove}><Icon class='close' /></Button></li> */}
                    </ul>
                </div>
            </Aux>
            
        )
    }  
}

const mapDispatchToProps = dispatch => {
    return {
        removeItemHandler: (id) => dispatch(actionsCreator.removeItemCart(id)),
        addItemHandler: (id) => dispatch(actionsCreator.addItemCart(id))
    }
}
    
export default connect(null, mapDispatchToProps)(Order);