import React, { Component } from 'react';
import Aux from 'react-aux';

import styles from './Order.module.css';
import Button from '../../../UI/Button/Button';
import Icon from '../../../UI/Icon/Icon';
import Burger from '../../Burger/Burger';

class Order extends Component {
    state = {
        ingredient: {}
    }

    componentDidMount () {
        let ingredientList = {}
        for (let ingredientName in this.props.ingredients.ingredient) {
            ingredientList[ingredientName] = this.props.ingredients.ingredient[ingredientName]
        }
        this.setState({ingredient: ingredientList});
    }

    render() {
        let ingredient = null;

        ingredient = Object.entries(this.state.ingredient).map(el => {
            return (
                    <div key={el[0]}>
                        <p style={{textTransform: 'capitalize'}}>{el[0]}: {el[1]}</p>
                    </div>
            )
        })
           
        return (
            <Aux>
                <div className={styles.Order}>
                    <Burger order ingredient={this.state.ingredient}/>   
                    <div>
                        {ingredient}
                        <p>Price: <strong>€ {this.props.price.toFixed(2)}</strong></p>
                        
                        <Button btnType="Danger" click={this.props.remove}><Icon class='close' /> Remove</Button>
                        
                        <Button btnType="Danger" click={this.props.removeAll}><Icon class='trash'/>Remove All</Button>
                    </div>                     
                </div>
            </Aux>
            
        )
    }  
}
    
export default Order;